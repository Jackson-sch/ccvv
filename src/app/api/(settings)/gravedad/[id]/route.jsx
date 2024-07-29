import { dbConnect } from "@/lib/mongoose";
import Gravedad from "@/models/Settings/Gravedad/Gravedad";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  await dbConnect();
  try {
    const gravedades = await Gravedad.findById(params.id);
    if (!gravedades) {
        return NextResponse.json(
          { message: "Gravedad not found" },
          { status: 404 }
        );
    }
    return NextResponse.json(gravedades, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(req, {params}) {
    await dbConnect()
    try {
        const gravedad = await Gravedad.findByIdAndDelete(params.id)
        if (!gravedad) {
            return NextResponse.json(
              { message: "Gravedad not found" },
              { status: 404 }
            );
        }
        return NextResponse.json({ message: "Gravedad deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function PUT(req, {params}) {
    await dbConnect()
    const gravedad = await Gravedad.findById(params.id)
    if (!gravedad) {
        return NextResponse.json(
          { message: "Gravedad not found" },
          { status: 404 }
        );
    }
    const data = await req.json()
    const updatedGravedad = await Gravedad.findByIdAndUpdate(params.id, data, {new: true})
    return NextResponse.json(updatedGravedad, { status: 200 })
}
