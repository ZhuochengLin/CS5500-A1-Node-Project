/**
 * @file Define Tuit interface that reflects the fields a tuit should have.
 */
import {User} from "./User";

export interface Tuit {
    content: string;
    postedBy: User;
    postedOn: Date;
}
