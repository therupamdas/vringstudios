import dbConnect from "@/lib/dbConnect";
import OrderModel, { Order } from "@/model/Order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  
  const body = await request.json();
  const { date } = body;

  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      {date},
      { istaken: true},
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Failed to update user status" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message Successful", updatedOrder},
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update user status", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user status" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   await dbConnect();

//   const session = await getServerSession(authOptions);
//   const user: User = session?.user as User;
//   if (!session || !session.user) {
//     return NextResponse.json(
//       { success: false, message: "Not Authenticated" },
//       { status: 401 }
//     );
//   }

//   const userId = user._id; // keep _id here too

//   try {
//     const foundUser = await UserModel.findById(userId);
//     if (!foundUser) {
//       return NextResponse.json(
//         { success: false, message: "User Not Found am" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, isAcceptingMessages: foundUser.isAcceptingMessages },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching user messages status", error);
//     console.log("Error in getting Messages");
//     return NextResponse.json(
//       { success: false, message: "Error in getting Messages" },
//       { status: 500 }
//     );
//   }
// }
