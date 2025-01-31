import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Error verifying username",
        },
        { status: 500 }
      );
    }
    const isCodeValid = user.verifyCode === code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()
    if (isCodeValid && isCodeNotExpired) {
        user.isverified = true
        await user.save()
        return Response.json(
            {
              success: true,
              message: "Successfull",
            },
            { status: 200 }
          );
    }
    else if (!isCodeNotExpired){
        return Response.json(
            {
              success: false,
              message: "Expired Code, signup again",
            },
            { status: 500 }
          );
    }
    else{
        return Response.json(
            {
              success: false,
              message: "Wrong Code",
            },
            { status: 500 }
          );
    }

  } catch (error) {
    console.error("Error Verifying usename", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
