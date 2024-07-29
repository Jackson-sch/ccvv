import { dbConnect } from "@/lib/mongoose";
import Turno from "@/models/Settings/Turno/Turno";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const turnos = await Turno.find();
  return NextResponse.json(turnos);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTurno = new Turno(body);
    const savedTurno = await newTurno.save();
    return NextResponse.json(savedTurno, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
