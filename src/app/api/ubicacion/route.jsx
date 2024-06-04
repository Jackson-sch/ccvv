import { dbConnect } from "@/lib/mongoose";
import Ubicacion from "@/models/Ubicacion/Ubicacion";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const ubicaciones = await Ubicacion.find({}).sort({ _id: -1 });
  return NextResponse.json(ubicaciones, { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newUbicacion = new Ubicacion(body);
    const savedUbicacion = await newUbicacion.save();
    return NextResponse.json(savedUbicacion, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}