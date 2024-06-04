import { dbConnect } from "@/lib/mongoose";
import Ubicacion from "@/models/Ubicacion/Ubicacion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;
  const ubicacion = await Ubicacion.findById(id);
  return NextResponse.json(ubicacion, { status: 200 });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;
  const ubicacion = await Ubicacion.findByIdAndDelete(id);
  if (!ubicacion) {
    return NextResponse.json(
      { message: "Ubicacion not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({message: "Ubicacion deleted"}, { status: 200 });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await request.json();
  const ubicacion = await Ubicacion.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(ubicacion, { status: 200 });
}