import {Tuit} from "./Tuit";
import {User} from "./User";

export interface Dislike {
    tuit: Tuit;
    dislikedBy: User;
}