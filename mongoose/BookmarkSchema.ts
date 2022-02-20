/**
 * @file Creates a MongoDB schema for {@link Bookmark} in the "bookmarks" collection.
 */
import mongoose from "mongoose";
import {Bookmark} from "../models/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: "TuitModel", required: true},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true}
}, {collection: "bookmarks"});

export default BookmarkSchema;