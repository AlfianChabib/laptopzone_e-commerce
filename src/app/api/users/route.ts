import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const users = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Alfian Chabib",
    },
  ];
  return NextResponse.json(users);
}
