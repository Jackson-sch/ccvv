import {dbConnect} from "@/lib/mongoose";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const users = await User.find({}).sort({_id: -1});
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newUser = new User(body);
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}