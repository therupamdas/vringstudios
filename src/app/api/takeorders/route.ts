import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { Message, User } from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

// Handles POST requests to /api/takeorders
export async function POST(req: Request) {

  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch the full User document from MongoDB based on the email from session
  const dbuser = await UserModel.findOne({ email: session.user.email });

  if (!dbuser) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }


  if (!dbuser.isAcceptingMessages) {
    return NextResponse.json({ error: "User is not accepting messages." }, { status: 403 });
  }

  // Parse the request body to get message data
  const body = await req.json();
  const { username, content, date, image, budget } = body;

  // Validate required fields (you can expand this as needed)
  if (!username || !content) {
    return NextResponse.json({ error: "Username and Content fields are required." }, { status: 400 });
  }

  // Create a new message object
  const newMessage: Message = {
    username,
    content,
    date,
    image,
    budget,
  } as Message;

  // Add the new message to the user's messages array
  dbuser.messages.push(newMessage);

  // Save the updated user document to the database
  await dbuser.save();

  // Respond with a success message
  return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
}
