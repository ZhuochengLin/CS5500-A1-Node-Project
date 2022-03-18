/**
 * @file Defines User interface that reflects the fields a user should have.
 */
import {AccountType} from "./enums/AccountType";
import {MaritalStatus} from "./enums/MaritalStatus";
import {Location} from "./Location";

export interface User {
    username: string;
    password: string;
    accountType: AccountType;
    joined: Date;
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string | null;
    headImage: string | null;
    maritalStatus: MaritalStatus;
    biography: string | null;
    dateOfBirth: Date | null;
    location: Location | null;
}
