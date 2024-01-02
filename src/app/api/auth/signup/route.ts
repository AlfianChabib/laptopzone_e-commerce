import { UpdateUser } from "@/lib/controller/auth/login";
import {
  addNewUser,
  checkData,
  checkEmail,
  checkUsername,
  responseFailed,
} from "@/lib/controller/auth/signup";
import { encryptPass } from "@/lib/controller/password";
import { setAccessToken, setRefreshToken } from "@/lib/token";
import { TypeUserSignUp } from "@/types/backend/auth/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const bodyData = await req.text();
  const data: TypeUserSignUp = JSON.parse(bodyData);

  const response = checkData(data);
  if (response.message !== "Success") {
    const respon = responseFailed(response.message);

    return NextResponse.json(respon);
  }

  // cek apakah username sudah terdaftar
  const isUsernameRegister = await checkUsername(data.userName);
  if (isUsernameRegister.message !== "Success") {
    const response = responseFailed(isUsernameRegister.message);

    return NextResponse.json(response);
  }

  //   cek apakah email sudah terdaftar
  const isEmailRegister = await checkEmail(data.email);
  if (isEmailRegister.message !== "Success") {
    const response = responseFailed(isEmailRegister.message);

    return NextResponse.json(response);
  }

  const encrypt = await encryptPass(data.password);
  if (encrypt.status === "failed") {
    const response = responseFailed(encrypt.message);

    return NextResponse.json(response);
  }

  const dataUser: TypeUserSignUp = {
    name: data.name,
    userName: data.userName,
    email: data.email,
    password: encrypt.password,
    address: data.address,
    picture: data.picture,
    telp: data.telp,
    refreshToken: "",
    products: "",
    carts: "",
    wishlists: "",
    transactions: "",
    seller: "",
  };

  const responseFinal = await addNewUser(dataUser);
  if (responseFinal.status == "failed") {
    const respon = responseFailed(responseFinal.message);
    return NextResponse.json(respon);
  }

  const payload = {
    userName: responseFinal.response?.userName,
    email: responseFinal.response?.email,
    id: responseFinal.response?.id,
  };

  const accessToken = setAccessToken(payload);
  const refreshToken = setRefreshToken(payload);
  const updated = await UpdateUser(responseFinal.response?.id, {
    refreshToken: responseFinal.response?.refreshToken,
  });

  if (updated?.status === "failed") {
    return NextResponse.json(updated);
  }

  return NextResponse.json({
    status: "success",
    statusCode: 200,
    message: "Success add new User",
    data: responseFinal.response,
    accessToken,
  });
}
