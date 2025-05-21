import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found (send)",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected Error", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
