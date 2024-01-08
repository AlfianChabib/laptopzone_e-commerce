import { setCartUser } from "@/lib/controller/cart/cart";
import { findProductById } from "@/lib/controller/user/user";
import { getAccessToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data: { qty: number } = JSON.parse(body);
  const params = new URL(req.url).searchParams;
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const productId: string | null = params.get("productId");
  const userId: string | null = params.get("userId");

  if (!token) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Token is required",
    });
  }

  if (!productId) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Product id is required",
    });
  }

  const idProduct = parseInt(productId);

  if (!userId) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "User id is required",
    });
  }

  if (!data.qty) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Quantity of product is required",
    });
  }

  const decoded = getAccessToken(token);
  if (decoded.status === "failed") {
    return NextResponse.json(decoded);
  }

  const id = parseInt(userId);

  if (decoded.data?.id !== id) {
    return NextResponse.json({
      status: "failed",
      statusCode: 403,
      message: "Oopss!! invalid id and token",
    });
  }

  const isProductRegister = await findProductById(idProduct);
  if (isProductRegister.status === "failed") {
    return NextResponse.json(isProductRegister);
  }
  const dataUser = { userId: id, productId: idProduct, quantity: data.qty };

  const addCart = await setCartUser(dataUser);
  if (addCart.status === "failed") {
    return NextResponse.json(addCart);
  }

  return NextResponse.json(addCart);
}
