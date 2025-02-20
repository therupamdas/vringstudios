import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server"; // ✅ Correct response import

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  try {
    await dbConnect(); // ✅ Ensure database connection

    const { searchParams } = new URL(request.url);
    const queryParam = { username: searchParams.get("username") };

    // ✅ Validate username using Zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message: usernameErrors.length > 0 
            ? usernameErrors.join(",") 
            : "Invalid Parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

    // ✅ Always return a response
    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: true, message: "Username is available" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error Checking username", error);
    return NextResponse.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
