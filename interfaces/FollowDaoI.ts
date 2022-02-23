/**
 * @file Declares the FollowDao interface.
 */
import {Follow} from "../models/Follow";

export interface FollowDaoI {
    userAFollowsUserB(uida: string, uidb: string): Promise<Follow>;
    userAUnfollowsUserB(uida: string, uidb: string): Promise<any>;
    findFollowersByUser(uid: string): Promise<Follow[]>;
    findFollowingsByUser(uid: string): Promise<Follow[]>;
    findAllFollows(): Promise<Follow[]>;
}
