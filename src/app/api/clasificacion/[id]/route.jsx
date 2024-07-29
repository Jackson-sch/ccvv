import { dbConnect } from "@/lib/mongoose";
import Clasificacion from "@/models/Clasificacion/Clasificacion";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();
  const clasificacion = await Clasificacion.findById(params.id);
  if (!clasificacion) {
    return NextResponse.json(
      { message: "Classification not found" },
      { status: 404 }
    );
  }
  const data = await request.json();
  const updatedClasificacion = await Clasificacion.findByIdAndUpdate(
    params.id,
    data,
    {
      new: true,
    }
  );
  return NextResponse.json(updatedClasificacion, { status: 200 });
}

export async function GET(request, { params }) {
  dbConnect();

  try {
    const clasificacion = await Clasificacion.findById(params.id);
    if (!clasificacion) {
      return NextResponse.json(
        { message: "Classification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(clasificacion, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();
  try {
    const clasificacion = await Clasificacion.findByIdAndDelete(params.id);
    if (!clasificacion) {
      return NextResponse.json(
        { message: "Classification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Classification deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
