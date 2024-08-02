import { dbConnect } from "@/lib/mongoose";
import Marca from "@/models/Settings/Marca/Marca";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();
  const marca = await Marca.findById(params.id);
  if (!marca) {
    return NextResponse.json({ message: "Marca not found" }, { status: 404 });
  }
  const data = await request.json();
  const updatedMarca = await Marca.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updatedMarca, { status: 200 });
}

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const marca = await Marca.findById(params.id);
    if (!marca) {
      return NextResponse.json({ message: "Marca not found" }, { status: 404 });
    }
    return NextResponse.json(marca, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const marca = await Marca.findByIdAndDelete(params.id);
    if (!marca) {
      return NextResponse.json({ message: "Marca not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Marca deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
