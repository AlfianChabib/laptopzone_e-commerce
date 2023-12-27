import {
  checkData,
  checkEmail,
  checkUsername,
  responseFailed,
} from "@/lib/controller/auth/signup";
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

  return NextResponse.json("ok");
}
