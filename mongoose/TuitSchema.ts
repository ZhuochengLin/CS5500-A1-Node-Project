/**
 * @file Creates a MongoDB schema for {@link Tuit} in the "tuits" collection.
 */
import mongoose, {Schema} from "mongoose";
import {Tuit} from "../models/Tuit";
import TuitStatsSchema from "./TuitStatsSchema";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    published: {type: Date, default: Date.now},
    image: {type: String, default: ""},
    youtube: {type: String, default: ""},
    avatarLogo: {type: String, default: ""},
    imageOverlay: {type: String, default: ""},
    stats: {type: TuitStatsSchema, default: () => ({})}
}, {collection: "tuits"});

export default TuitSchema;