import mongoose from "mongoose";
import Follow from "../models/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
    followedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true}
}, {collection: "follows"});

export default FollowSchema;