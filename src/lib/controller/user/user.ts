import { prisma } from "@/lib/prisma/client";
import { TypeUserPut } from "@/types/backend/auth/user";

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

export async function editUserById(data: TypeUserPut, id: number) {
  try {
    const { name, userName, address, telp, picture } = data;
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        userName,
        address,
        telp,
        picture,
      },
    });

    if (!user) {
      return {
        status: "failed",
        message: "gaada coi",
      };
    }

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully edit data user",
      data: user,
    };
  } catch (error: any) {
    if (error.name) {
      return {
        status: "failed",
        statusCode: 500,
        message: "Unregistered Id!",
        data: {},
      };
    }
    
    return {
      status: "failed",
      statusCode: 500,
      message: error || "Something when wrong when updating data!",
      data: {},
    };
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
