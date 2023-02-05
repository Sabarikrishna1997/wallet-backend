import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const HistorySchmea = new mongoose.Schema(
  {
    userId: ObjectId,
    amount: Number,
    payTo: String,
    reason: String,
  },
  { timestamps: true }
);

const History = mongoose.model("History", HistorySchmea);
export default History;