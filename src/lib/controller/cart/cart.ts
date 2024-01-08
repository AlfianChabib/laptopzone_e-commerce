import prisma from "@/lib/prisma/client";

export async function setCartUser(data: {
  userId: number;
  productId: number;
  quantity: number;
}) {
  try {
    const response = await prisma.cartItem.create({
      data: {
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity,
      },
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Success add cart",
      data: response,
    };
  } catch (error) {
    return {
      status: "failed",
      statusCode: 500,
      message: error || "Internal server error!",
      data: [],
    };
  } finally {
    await prisma.$disconnect();
  }
}
