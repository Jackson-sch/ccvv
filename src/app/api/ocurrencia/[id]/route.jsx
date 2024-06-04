import { dbConnect } from "@/lib/mongoose";
import Ocurrencia from "@/models/Ocurrencia/Ocurrencia";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  dbConnect();

  try {
    const ocurrencia = await Ocurrencia.findById(params.id);
    if (!ocurrencia) {
      return NextResponse.json(
        { message: "Occurrence not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(ocurrencia, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const ocurrencia = await Ocurrencia.findById(params.id);
  if (!ocurrencia) {
    return NextResponse.json(
      { message: "Ocurrencia not found" },
      { status: 404 }
    );
  }
  const data = await request.json();
  const updatedOcurrencia = await Ocurrencia.findByIdAndUpdate(
    params.id,
    data,
    {
      new: true,
    }
  )
  return NextResponse.json(updatedOcurrencia, { status: 200 });
}


export async function DELETE(request, { params }) {
  dbConnect();
  try {
    const ocurrencia = await Ocurrencia.findByIdAndDelete(params.id);
    if (!ocurrencia) {
      return NextResponse.json(
        { message: "Ocurrencia not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Ocurrencia deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
