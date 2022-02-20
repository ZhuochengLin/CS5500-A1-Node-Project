/**
 * @file Creates a MongoDB schema for {@link Like} in the "likes" collection.
 */
import mongoose, {Schema} from "mongoose";
import {Like} from "../models/Like";

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true}
}, {collection: "likes"});

export default LikeSchema;