import { dbConnect } from "@/lib/mongoose";
import Workstation from "@/models/Workstation/Workstation";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const workstation = await Workstation.find();
  return NextResponse.json(workstation, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newWorkstation = new Workstation(body);
    const savedWorkstation = await newWorkstation.save();
    return NextResponse.json(savedWorkstation, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
