import { dbConnect } from "@/lib/mongoose";
import Gravedad from "@/models/Settings/Gravedad/Gravedad";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const gravedades = await Gravedad.find();
  return NextResponse.json(gravedades);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newGravedad = new Gravedad(body);
        const savedGravedad = await newGravedad.save();
        return NextResponse.json(savedGravedad, { status: 200 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}