import { LoginUser, checkDataLogin } from "@/lib/controller/auth/login";
import { responseFailed } from "@/lib/controller/auth/signup";
import { TypeUserLogin } from "@/types/backend/auth/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data: TypeUserLogin = JSON.parse(body);

  const response = checkDataLogin(data);
  if (response.message !== "Success") {
    const responseFail = responseFailed(response.message);
    return NextResponse.json(responseFail);
  }

  const responseUser = await LoginUser(data);
  if (Object.entries(responseUser.data).length === 0) {
    return NextResponse.json(responseUser);
  }

  return NextResponse.json(responseUser);
}
