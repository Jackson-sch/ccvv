import { dbConnect } from "@/lib/mongoose";
import Turno from "@/models/Settings/Turno/Turno";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const turnos = await Turno.find();
  return NextResponse.json({ turnos });
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const turno = new Turno(data);
  const savedTurno = await turno.save();
  return NextResponse.json({ savedTurno });
}
