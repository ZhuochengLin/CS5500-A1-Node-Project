import mongoose from "mongoose";
import Profile from "../models/Profile";
import {MaritalStatus} from "../models/enums/MaritalStatus";

const ProfileSchema = new mongoose.Schema<Profile>({
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
});

export default ProfileSchema;