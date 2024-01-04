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
