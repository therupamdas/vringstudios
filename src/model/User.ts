import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  username: string;
  content: string;
  date: string;
  image: string;
  budget: string;
  istaken: boolean;
}
const MessageSchema: Schema<Message> = new Schema({
  username: { type: String, required: false },
  content: { type: String, required: false },
  date: { type: String, required: false }, // or Date if it's a date
  image: { type: String, required: false },
  budget: { type: String, required: false },
  istaken: { type: Boolean, required: false, default: false },
});

export interface User extends Document {
  username: string;
  name: string;
  email: string;
  phonenumber: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isverified: boolean;
  isAcceptingMessages: boolean;
  image: string;
  createdAt: Date;
  messages: Message[];
  instagramId?: string;
  linkedInId?: string;
  college?: string;
  language?: string[];
  accountStatus: "active" | "inactive";
  role: "Client" | "Editor";
  dateOfBirth?: Date;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  bio?: string;
  whatsappNumber?: string;
  city?: string;
  state?: string;
}
const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: [true, "Username is required"], trim: true, unique: true },
  name: { type: String, required: false, trim: true },
  email: { type: String, required: [true, "Email is required"],
    trim: true, unique: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"] },
  phonenumber: { type: String, required: false,
    trim: true, unique: true, match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number"] },
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: { type: String, required: [true, "Code is required"] },
  verifyCodeExpiry: { type: Date, required: [true, "Code Expiry is required"] },
  isverified: { type: Boolean, default: false },
  isAcceptingMessages: { type: Boolean, default: true },
  image: { type: String, required: false, trim: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
  messages: { type: [MessageSchema], default: [] },
  instagramId: { type: String, required: false, trim: true },
  linkedInId: { type: String, required: false, trim: true },
  college: { type: String, required: false, trim: true },
  language: { type: [String], required: false, default: ["English", "Hindi"] },
  accountStatus: { type: String, enum: ["active", "inactive"], default: "active", required: false },
  role: { type: String, enum: ["Client", "Editor"], default: "Client", required: false },
  dateOfBirth: { type: Date, required: false },
  gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"], required: false },
  bio: { type: String, required: false, trim: true },
  whatsappNumber: { type: String, required: false, trim: true },
  city: { type: String, required: false, trim: true },
  state: { type: String, required: false, trim: true },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);

export default UserModel;
