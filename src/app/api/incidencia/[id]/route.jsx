import { dbConnect } from "@/lib/mongoose";
import Incidencia from "@/models/Incidencia/Incidencia";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  dbConnect();

  try {
    const incidencia = await Incidencia.findById(params.id);
    if (!incidencia) {
      return NextResponse.json(
        { message: "Incidence not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(incidencia, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const incidencia = await Incidencia.findById(params.id);
  if (!incidencia) {
    return NextResponse.json(
      { message: "Incidence not found" },
      { status: 404 }
    );
  }
  const data = await request.json();
  const updatedIncidencia = await Incidencia.findByIdAndUpdate(
    params.id,
    data,
    {
      new: true,
    }
  )
  return NextResponse.json(updatedIncidencia, { status: 200 });
}

export async function DELETE(request, { params }) {
  dbConnect();
  try {
    const incidencia = await Incidencia.findByIdAndDelete(params.id);
    if (!incidencia) {
      return NextResponse.json(
        { message: "Incidence not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Incidence deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}