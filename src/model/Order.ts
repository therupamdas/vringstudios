import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
  username: string;
  content: string;
  date: string;
  image: string;
  budget: string,
}

const OrderSchema = new Schema({
  username: { type: String, required: false},
  content: { type: String, required: false },
  date: { type: String, required: false }, // or Date if it's a date
  image: { type: String, required: false },
  budget: { type: String, required: false},
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default OrderModel;
