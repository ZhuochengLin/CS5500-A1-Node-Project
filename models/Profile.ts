import {MaritalStatus} from "./enums/MaritalStatus";
import Location from "./Location";

export default interface Profile {

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