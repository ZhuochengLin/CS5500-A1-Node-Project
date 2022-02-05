import {AccountType} from "./enums/AccountType";
import Profile from "./Profile";
import Message from "./Message";
import Tuit from "./Tuit";

export default interface User {

    username: string;
    password: string;
    accountType: AccountType;
    joined: Date;
    profile: Profile;

}