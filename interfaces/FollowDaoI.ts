import Follow from "../models/Follow";

export default interface FollowDaoI {
    userAFollowsUserB(uida: string, uidb: string): Promise<Follow>;
    userAUnfollowsUserB(uida: string, uidb: string): Promise<any>;
    findFollowersByUser(uid: string): Promise<Follow[]>;
    findFollowingsByUser(uid: string): Promise<Follow[]>;
}
