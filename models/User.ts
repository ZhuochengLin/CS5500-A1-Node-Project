/**
 * @file Defines User interface that reflects the fields a user should have.
 */
import {AccountType} from "./enums/AccountType";
import {Profile} from "./Profile";

export interface User {
    username: string;
    password: string;
    accountType: AccountType;
    joined: Date;
    profile: Profile;
}
