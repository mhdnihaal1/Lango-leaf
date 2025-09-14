import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
     email: {
      type: String,
      reqiured:true
    },
    otp: {
      type: String,
      reqiured:true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // <-- TTL index
    },
  },
  {
    timestamps: true,
  }
);

const otp = mongoose.model("otp", otpSchema);

export default otp;
