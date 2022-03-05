/**
 * @file Define Tuit interface that reflects the fields a tuit should have.
 */
import {User} from "./User";
import {TuitStats} from "./TuitStats";

export interface Tuit {
    tuit: string;
    postedBy: User;
    published: Date;
    image: string;
    youtube: string;
    avatarLogo: string;
    imageOverlay: string;
    stats: TuitStats
}
