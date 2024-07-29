import { dbConnect } from "@/lib/mongoose";
import Comisaria from "@/models/Settings/Comisaria/Comisaria";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();
  const comisaria = await Comisaria.findById(params.id);
  if (!comisaria) {
    return NextResponse.json(
      { message: "Comisaria not found" },
      { status: 404 }
    );
  }
  const data = await request.json();
  const updatedComisaria = await Comisaria.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updatedComisaria, { status: 200 });
}

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const comisaria = await Comisaria.findById(params.id);
    if (!comisaria) {
      return NextResponse.json(
        { message: "Comisaria not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(comisaria, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const comisaria = await Comisaria.findByIdAndDelete(params.id);
    if (!comisaria) {
      return NextResponse.json(
        { message: "Comisaria not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Comisaria deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
