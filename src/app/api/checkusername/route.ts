import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  if (request.method!='GET') {
    return Response.json(
      { 
        success: true,
        message:'not GET'
      },
      { status: 400 }
    );
  }
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        { 
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid Parameters",
        },
        { status: 400 }
      );
    }
    const {username} = result.data
    const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})
    if (existingVerifiedUser){
      return Response.json(
        { 
          success: true,
          message:'Username is already taken'
        },
        { status: 400 }
      );
      return Response.json(
        { 
          success: true,
          message:'Username is Available'
        },
        { status: 400 }
      );

    }

  } catch (error) {
    console.error("Error Checking usename", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
