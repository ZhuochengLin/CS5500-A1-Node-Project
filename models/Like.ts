/**
 * @file Defines Like interface that reflects "user likes another user" relationship.
 */
import {Tuit} from "./Tuit";
import {User} from "./User";

export interface Like {
    tuit: Tuit;
    likedBy: User;
}
