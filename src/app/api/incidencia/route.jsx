import { dbConnect } from "@/lib/mongoose";
import Incidencia from "@/models/Incidencia/Incidencia";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const incidencias = await Incidencia.find({}).sort({ _id: -1 });
  return NextResponse.json(incidencias, { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newIncidencia = new Incidencia(body);
    const savedIncidencia = await newIncidencia.save();
    return NextResponse.json(savedIncidencia, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}