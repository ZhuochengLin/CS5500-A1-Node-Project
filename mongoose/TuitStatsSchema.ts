/**
 * @file Creates a MongoDB schema for {@link TuitStats} in the "tuits" collection.
 */
import mongoose from "mongoose";
import {TuitStats} from "../models/TuitStats";

const TuitStatsSchema = new mongoose.Schema<TuitStats>({
    replies: {type: Number, default: 0},
    retuits: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
});
export default TuitStatsSchema;