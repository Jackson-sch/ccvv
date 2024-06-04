import { dbConnect } from "@/lib/mongoose";
import Clasificacion from "@/models/Clasificacion/Clasificacion";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const clasificaciones = await Clasificacion.find({}).sort({ _id: -1 });
  return NextResponse.json(clasificaciones, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newClasificacion = new Clasificacion(body);
    const savedClasificacion = await newClasificacion.save();
    return NextResponse.json(savedClasificacion, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
