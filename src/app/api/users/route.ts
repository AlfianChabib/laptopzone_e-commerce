import { getAllUser } from "@/lib/controller/user/user";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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
