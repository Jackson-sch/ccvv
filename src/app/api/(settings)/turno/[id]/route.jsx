import { dbConnect } from "@/lib/mongoose";
import Turno from "@/models/Settings/Turno/Turno";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  await dbConnect();
  try {
    const turnos = await Turno.findById(params.id);
    if (!turnos) {
        return NextResponse.json(
          { message: "Turno not found" },
          { status: 404 }
        );
    }
    return NextResponse.json(turnos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}


export async function DELETE(req, {params}) {
  await dbConnect();
  try {
    const turno = await Turno.findByIdAndDelete(params.id)
    if (!turno) {
        return NextResponse.json(
          { message: "Turno not found" },
          { status: 404 }
        );
    }
    return NextResponse.json({ message: "Turno deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}


export async function PUT(req, {params}) {
    await dbConnect();
    const turno = await Turno.findById(params.id)
    if (!turno) {
        return NextResponse.json(
          { message: "Turno not found" },
          { status: 404 }
        );
    }
    const data = await req.json()
    const updatedTurno = await Turno.findByIdAndUpdate(params.id, data, {new: true})
    return NextResponse.json(updatedTurno, { status: 200 })
}
