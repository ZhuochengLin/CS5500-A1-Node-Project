import {Dislike} from "../models/Dislike";

export interface DislikeDaoI {
    userLikesTuit(uid: string, tid: string): Promise<any>;
    userUnlikesTuit(uid: string, tid: string): Promise<Dislike>;
    findUserDislikedTuit(uid: string, tid: string): Promise<Dislike | null>;
    findAllDislikes(): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    countHowManyDislikedTuit(tid: string): Promise<number>;
}