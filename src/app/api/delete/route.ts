import prisma from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const passAdmin = new URL(req.url).searchParams.get("password");
    if (passAdmin !== "abclimadasar") {
      return NextResponse.json({ message: "oops kata sandi salah" });
    }

    await prisma.user.deleteMany();
    return NextResponse.json("Data Berhasil di hapus");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
