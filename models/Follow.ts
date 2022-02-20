/**
 * @file Defines Follow interface that reflects "user follows another user" relationship.
 */
import {User} from "./User";

export interface Follow {
    user: User;
    followedBy: User;
}
