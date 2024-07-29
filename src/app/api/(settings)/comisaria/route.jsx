import { dbConnect } from "@/lib/mongoose";
import Comisaria from "@/models/Settings/Comisaria/Comisaria";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const comisarias = await Comisaria.find();
  return NextResponse.json(comisarias);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newComisaria = new Comisaria(body);
    const savedComisaria = await newComisaria.save();
    return NextResponse.json(savedComisaria, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
