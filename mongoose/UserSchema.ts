/**
 * @file Creates a MongoDB schema for {@link User} in the "users" collection.
 */
import mongoose from "mongoose";
import {User} from "../models/User";
import {AccountType} from "../models/enums/AccountType";
import {MaritalStatus} from "../models/enums/MaritalStatus";

const UserSchema = new mongoose.Schema<User>({
    username: {type: String, index: true, unique: true, required: true},
    password: {type: String, required: true},
    accountType: {
        type: String,
        default: AccountType.Personal,
        enum: [AccountType.Personal, AccountType.Academic, AccountType.Professional]
    },
    joined: {type: Date, default: Date.now},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    email: {type: String, default: ""},
    profilePhoto: {type: String, default: null},
    headImage: {type: String, default: null},
    maritalStatus: {
        type: String,
        default: MaritalStatus.Single,
        enum: [MaritalStatus.Single, MaritalStatus.Married, MaritalStatus.Widowed]
    },
    biography: {type: String, default: null},
    dateOfBirth: {type: Date, default: null},
    location: {type: {longitude: Number, latitude: Number}, default: {longitude: 0.0, latitude: 0.0}}
}, {collection: "users"});

export default UserSchema;