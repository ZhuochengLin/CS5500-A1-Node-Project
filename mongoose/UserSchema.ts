/**
 * @file Creates a MongoDB schema for {@link User} in the "users" collection.
 */
import mongoose from "mongoose";
import {User} from "../models/User";
import {AccountType} from "../models/enums/AccountType";
import ProfileSchema from "./ProfileSchema";

const UserSchema = new mongoose.Schema<User>({
    username: {type: String, index: true, unique: true, required: true},
    password: {type: String, required: true},
    accountType: {
        type: String,
        default: AccountType.Personal,
        enum: [AccountType.Personal, AccountType.Academic, AccountType.Professional]
    },
    joined: {type: Date, default: Date.now},
    profile: {type: ProfileSchema, default: () => ({})}
}, {collection: "users"});

export default UserSchema;