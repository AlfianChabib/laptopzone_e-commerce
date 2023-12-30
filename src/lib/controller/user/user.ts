import { prisma } from "@/lib/prisma/client";

export async function getAllUser() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);

    return { status: "success", data: users };
  } catch (error) {
    return { status: "failed", data: [] };
  } finally {
    await prisma.$disconnect();
  }
}
