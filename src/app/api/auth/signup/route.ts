import { checkData, checkUsername } from "@/lib/controller/auth/signup";
import { TypeUserSignUp } from "@/types/backend/auth/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data: TypeUserSignUp = JSON.parse(body);

  const response = checkData(data);
  if (response.message !== "Success")
    return NextResponse.json({
      status: "failed",
      statusCode: 400,
      message: response.message,
    });

  const isUsernameRegister = await checkUsername(data.userName);
  if (isUsernameRegister) {
    return NextResponse.json({
      status: "failed",
      statusCode: 400,
      message: "Username already registered",
    });
  }

  return NextResponse.json("ok");
}
