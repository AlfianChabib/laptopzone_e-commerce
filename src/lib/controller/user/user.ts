import { prisma } from "@/lib/prisma/client";

export async function getAllUser() {
  try {
    const users = await prisma.user.findMany();
    return { status: "success", data: users };
  } catch (error) {
    return { status: "failed", data: [] };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOneUser(id: number) {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      return {
        statusCode: 404,
        message: "User not found!",
        user: null,
        status: "failed",
      };
    }

    return {
      statusCode: 200,
      message: "Succes get one user",
      user,
      status: "success",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "failed when get one data",
      user: null,
      status: "failed",
    };
  } finally {
    await prisma.$disconnect();
  }
}
