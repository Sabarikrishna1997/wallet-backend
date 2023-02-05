import mongoose from "mongoose";
import History from "../models/History.js";
import User from "../models/User.js";


 const ObjectId = mongoose.Types.ObjectId;
export const getUser = async (req, res) => {
try {
  //  const data = await User.findById(req.params.id);
    const data = await User.aggregate([
      {
        $match: { _id: ObjectId(req.params.id) },
      },
      {
        $lookup: {
              from: "histories",
              localField: "_id",
              foreignField: "userId",
            as:"history"
        },
      },
    ]);
    console.log(data);
    if (!data) res.status(400).json({ Message: "no data" })
    res.status(200).json(data);
} catch (error) {
    console.log(error);
    res.status(400).json({ Message: "error" });
}    
};

export const addBalance = async (req, res) => {
    try {
        const {amount}=req.body
        const data = await User.findByIdAndUpdate(req.params.id, {
          $inc: { balance: amount },
          lastCredited:amount,
        });
        res.status(200).json({message:"success"})
    } catch (error) {
         res.status(400).json({ message: "error" });
    }
}
export const payment = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, amount } = req.body;
        await User.findByIdAndUpdate(userId, {
          $inc: { balance: -amount },
          LastDebited:amount,
        });
        await History.create(req.body)
        res.status(200).json({message:"success"})
        
    } catch (error) {
        console.log(error);
          res.status(400).json({ message: "error" });
    }
}

export const history =async (req, res) => {
    try {
        console.log(req.params);
        const data = History.find({ userId: req.params.id });
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'error'})
    }
}