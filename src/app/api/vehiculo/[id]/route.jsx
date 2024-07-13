import { dbConnect } from "@/lib/mongoose";
import Vehiculo from "@/models/Vehiculo/Vehiculo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();
  const vehiculo = await Vehiculo.findById(params.id);
  if (!vehiculo) {
    return NextResponse.json({ message: "Vehiculo not found" }, { status: 404 });
  }
  const data = await request.json();
  const updatedVehiculo = await Vehiculo.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updatedVehiculo, { status: 200 });
}

export async function GET(request, { params }) {
  dbConnect();

  try {
    const vehiculo = await Vehiculo.findById(params.id);
    if (!vehiculo) {
      return NextResponse.json({ message: "Vehiculo not found" }, { status: 404 });
    }
    return NextResponse.json(vehiculo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();

  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(params.id);

    if (!vehiculo) {
      return NextResponse.json({ message: "Vehiculo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Vehiculo deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}