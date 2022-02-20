/**
 * @file Defines Profile interface that reflects the {@link User}'s profile info.
 */
import {MaritalStatus} from "./enums/MaritalStatus";
import {Location} from "./Location";

export interface Profile {
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
