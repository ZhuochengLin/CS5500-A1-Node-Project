/**
 * @file Creates a MongoDB schema for {@link Tuit} in the "tuits" collection.
 */
import mongoose, {Schema} from "mongoose";
import {Tuit} from "../models/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
    content: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});

export default TuitSchema;