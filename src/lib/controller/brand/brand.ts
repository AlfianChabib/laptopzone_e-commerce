import { prisma } from "@/lib/prisma/client";
import { NameBrand } from "@/types/backend/brand/brand";

export async function setNameBrand(data: NameBrand[]) {
  try {
    await prisma.brand.createMany({ data });
    return {
      status: "success",
      statusCode: 200,
      message: "Successfully add Data!",
    };
  } catch (error) {
    return {
      status: "failed",
      statusCode: 500,
      message: error || "Something when wrong when add data",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getNameBrandByName(name: string) {
  try {
    const data = await prisma.brand.findFirst({
      where: {
        name,
      },
    });
    if (!data) {
      return {
        status: "failed",
        statusCode: 404,
        message: "Cannot find id",
        data: null,
      };
    }

    return {
      status: "success",
      statusCode: 404,
      message: "Success get one id brand",
      data: data.id,
    };
  } catch (error) {
    return {
      status: "failed",
      statusCode: 500,
      message: error || "Internal server Error!",
      data: null
    };
  } finally {
    await prisma.$disconnect();
  }
}
