import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const data = await request.json();
  const updatedUser = await User.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updatedUser, { status: 200 });
}

export async function GET(request, { params }) {
  dbConnect();

  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();

  try {
    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}