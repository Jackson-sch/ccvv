import { dbConnect } from "@/lib/mongoose";
import Zona from "@/models/Zonas/Zonas";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const zonas = await Zona.find({}).sort({ _id: -1 });
  return NextResponse.json(zonas, { status: 200 });
}

export async function POST(request) {
  
  try {
    const body = await request.json();
    const newZona = new Zona(body);
    const savedZona = await newZona.save();
    return NextResponse.json(savedZona, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
