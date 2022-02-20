/**
 * @file Creates a MongoDB schema for {@link Message} in the "messages" collection.
 */
import mongoose, {now} from "mongoose";
import {Message} from "../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
   sender: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
   receiver: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
   message: {type: String, required: true},
   sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});

export default MessageSchema;