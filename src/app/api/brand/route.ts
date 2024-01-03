import { setNameBrand } from "@/lib/controller/brand/brand";
import { NameBrand } from "@/types/backend/brand/brand";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const data: NameBrand[] = JSON.parse(body);
  const response = await setNameBrand(data);
  if (response.status === "failed") {
    return NextResponse.json(response);
  }

  return NextResponse.json(response);
}
