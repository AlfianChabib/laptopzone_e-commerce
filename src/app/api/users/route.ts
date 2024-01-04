import {
  checkEmail,
  checkEmailUser,
  checkPhoneNumber,
  checkUsernameUser,
  findOneByUserName,
  responseFailed,
} from "@/lib/controller/auth/signup";
import {
  editUserById,
  getAllUser,
  getOneUser,
} from "@/lib/controller/user/user";
import { getAccessToken } from "@/lib/token";
import { TypeUserPut } from "@/types/backend/auth/user";
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
  const data: TypeUserPut = JSON.parse(body);
  const tokenUser = data.token;
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
