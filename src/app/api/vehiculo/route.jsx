import { dbConnect } from "@/lib/mongoose";
import Vehiculo from "@/models/Vehiculo/Vehiculo"
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const vehiculos = await Vehiculo.find({}).sort({ _id: -1 });
  return NextResponse.json(vehiculos, { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newVehiculo = new Vehiculo(body);
    const savedVehiculo = await newVehiculo.save();
    return NextResponse.json(savedVehiculo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}