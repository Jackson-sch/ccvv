import { dbConnect } from "@/lib/mongoose";
import Ocurrencia from "@/models/Ocurrencia/Ocurrencia";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const ocurrencias = await Ocurrencia.find({}).sort({ _id: -1 });
  return NextResponse.json(ocurrencias, { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newOcurrencia = new Ocurrencia(body);
    const savedOcurrencia = await newOcurrencia.save();
    return NextResponse.json(savedOcurrencia, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
