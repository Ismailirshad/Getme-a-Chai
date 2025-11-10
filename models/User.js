import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String },
  name: { type: String },
  username: { type: String },
  profilepic: { type: String },
  coverpic: { type: String},
  createdAt: { type: String},
  updatedAt: { type: String },
  razorpayid: { type: String },
  razorpaysecret: { type: String }
});

export default mongoose.models.User || model("User", UserSchema); 