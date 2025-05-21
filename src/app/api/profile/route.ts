// /app/api/user/profile/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
    console.log(session)
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  // Customize: you can fetch additional user info from DB
  return new Response(JSON.stringify({ user: session.user }), {
    headers: { "Content-Type": "application/json" },
  });
}
