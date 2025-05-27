import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  
  const newMessage = await OrderModel.create(body);
  return NextResponse.json(newMessage, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const messages = await OrderModel.find().sort({ date: -1 });
  return NextResponse.json(messages);
}
