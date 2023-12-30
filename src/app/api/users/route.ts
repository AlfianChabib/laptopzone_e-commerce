import { getAllUser, getOneUser } from "@/lib/controller/user/user";
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
