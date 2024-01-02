import {
  LoginUser,
  UpdateUser,
  checkDataLogin,
} from "@/lib/controller/auth/login";
import { responseFailed } from "@/lib/controller/auth/signup";
import { setAccessToken, setRefreshToken } from "@/lib/token";
import { FuncLoginUser, TypeUserLogin } from "@/types/backend/auth/user";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data: TypeUserLogin = JSON.parse(body);

  const response = checkDataLogin(data);
  if (response.message !== "Success") {
    const responseFail = responseFailed(response.message);
    return NextResponse.json(responseFail);
  }

  const responseUser: FuncLoginUser = await LoginUser(data);
  const isDataEmpty = Object.entries(responseUser.data).length === 0;
  if (isDataEmpty) {
    return NextResponse.json({ ...responseUser });
  }

  const accessToken = setAccessToken(responseUser.data);
  const refreshToken = setRefreshToken(responseUser.data);
  const updated = await UpdateUser(responseUser.data.id, { refreshToken });
  if (updated?.status === "failed") {
    return NextResponse.json(updated);
  }

  return NextResponse.json({
    ...responseUser,
    accessToken,
  });
}
