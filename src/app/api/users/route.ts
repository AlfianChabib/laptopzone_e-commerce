import {
  checkPhoneNumber,
  checkUsernameUser,
  findOneByUserName,
} from "@/lib/controller/auth/signup";
import {
  editUserById,
  getAllUser,
  getOneUser,
  setProductsTable,
  setUserSeller,
} from "@/lib/controller/user/user";
import { getAccessToken } from "@/lib/token";
import { TypeUserPut } from "@/types/backend/auth/user";
import { ProductsData } from "@/types/backend/user/userType";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = new URL(request.url).searchParams.get("id");
  if (id) {
    const idUser = parseInt(id);
    if (idUser) {
      const { statusCode, status, message, user } = await getOneUser(idUser);
      return NextResponse.json({
        status,
        statusCode,
        message,
        data: user,
      });
    } else {
      return NextResponse.json({
        status: "failed",
        statusCode: 400,
        message: "Ooopss! cannot find id",
        data: null,
      });
    }
  }

  const users = await getAllUser();
  if (users.status === "failed") {
    return NextResponse.json({
      status: "failed",
      statusCode: 500,
      message: "Smething when wrong, failed get All user!",
      data: [],
    });
  }
  return NextResponse.json({
    status: "success",
    statusCode: 200,
    message: "success get All user!",
    data: users.data,
  });
}

export async function PUT(req: NextRequest) {
  const body = await req.text();
  const tokenUser = req.headers.get("Authorization")?.split(" ")[1];

  const params = new URL(req.url).searchParams;
  const idParam = params.get("id");
  if (!idParam) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Id is required",
    });
  }

  const id = parseInt(idParam);
  if (!id) {
    return NextResponse.json({
      status: "failed",
      statusCode: 400,
      message: "Oopss unknown id",
    });
  }
  const data: TypeUserPut = JSON.parse(body);
  if (!tokenUser) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Token is required",
    });
  }

  const decoded = getAccessToken(tokenUser);
  if (decoded.status === "failed") {
    return NextResponse.json(decoded);
  }

  if (decoded.data?.id !== id) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Oopss!! invalid id and token",
    });
  }

  const isUserName = checkUsernameUser(data.userName);
  if (isUserName.message !== "Success") {
    return NextResponse.json({
      status: "failed",
      statusCode: 400,
      message: isUserName.message,
    });
  }

  const isUserNameRegistered = await findOneByUserName(data.userName);
  if (isUserNameRegistered.status === "failed") {
    return NextResponse.json(isUserNameRegistered);
  }

  const isPhoneNumber = checkPhoneNumber(data.telp);
  if (isPhoneNumber.message !== "Success") {
    return NextResponse.json({
      status: "failed",
      statusCode: 400,
      message: isPhoneNumber.message,
    });
  }

  const dataUser = {
    name: data.name,
    userName: data.userName,
    address: data.address,
    telp: data.telp,
    picture: data.picture,
  };

  const response = await editUserById(dataUser, id);
  if (response.status === "failed") {
    return NextResponse.json(response);
  }

  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  const data: ProductsData = JSON.parse(body);
  const params = new URL(req.url).searchParams;
  const seller = params.get("seller");
  const id = params.get("id");
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Access denied, token is required!",
    });
  }

  const decoded = getAccessToken(token);
  if (decoded.status === "failed") {
    return NextResponse.json(decoded);
  }

  if (!id) {
    return NextResponse.json({
      status: "failed",
      statusCode: 400,
      message: "Id is required",
      data: null,
    });
  }

  if (seller === "true") {
    const idUser = parseInt(id);
    if (!idUser) {
      return NextResponse.json({
        status: "failed",
        statusCode: 400,
        message: "Please fill id properly!",
        data: null,
      });
    }

    if (decoded.data?.id !== idUser) {
      return NextResponse.json({
        status: "failed",
        statusCode: 403,
        message: "Oopss!! invalid id and token",
      });
    }

    const responseSeller = await setUserSeller(idUser);
    if (responseSeller.status === "failed") {
      return NextResponse.json(responseSeller);
    }

    const responseProducts = await setProductsTable(data, idUser);
    if (responseProducts?.status === "failed") {
      return NextResponse.json(responseProducts);
    }

    return NextResponse.json(responseProducts);
  }
}
