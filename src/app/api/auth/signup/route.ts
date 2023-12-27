import {
  addNewUser,
  checkData,
  checkEmail,
  checkUsername,
  responseFailed,
} from "@/lib/controller/auth/signup";
import { encryptPass } from "@/lib/controller/password";
import { TypeUserSignUp } from "@/types/backend/auth/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data: TypeUserSignUp = JSON.parse(body);

  const response = checkData(data);
  if (response.message !== "Success") {
    const res = responseFailed(response.message);
    return NextResponse.json(res);
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
    products: "",
    carts: "",
    wishlists: "",
    transactions: "",
    seller: "",
  };

  const responseFinal = await addNewUser(dataUser);
  if (responseFinal.status == "failed") {
    const res = responseFailed(responseFinal.message);
    return NextResponse.json(res);
  }

  return NextResponse.json({
    status: "success",
    statusCode: 200,
    message: "Success add new User",
    data: responseFinal.response,
  });
}
