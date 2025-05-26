import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  username: String,
  message: String,
  date: String,
  image: String,
  budget: String,
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default OrderModel;
