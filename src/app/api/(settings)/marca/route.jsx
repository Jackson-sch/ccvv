import { dbConnect } from "@/lib/mongoose";
import Marca from "@/models/Settings/Marca/Marca";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const marcas = await Marca.find({});
  return NextResponse.json(marcas);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newMarca = new Marca(body);
    const savedMarca = await newMarca.save();
    return NextResponse.json(savedMarca, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
