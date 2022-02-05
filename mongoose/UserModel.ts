import mongoose from "mongoose";
import UserSchema from "./UserSchema";
import User from "../models/User";

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
