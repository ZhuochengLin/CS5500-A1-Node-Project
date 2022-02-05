import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

const tuitModel = mongoose.model("TuitModel", TuitSchema);

export default tuitModel;