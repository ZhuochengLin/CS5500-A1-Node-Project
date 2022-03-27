/**
 * @file Declares the likeDao interface.
 */
import {Like} from "../models/Like";

export interface LikeDaoI {
    userLikesTuit(uid: string, tid: string): Promise<Like>;
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
    findUserLikedTuit(uid: string, tid: string): Promise<Like | null>;
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    findAllLikes(): Promise<Like[]>;
    countHowManyLikedTuit(tid: string): Promise<number>;
}
