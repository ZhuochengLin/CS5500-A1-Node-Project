import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";

export default class LikeDao implements LikeDaoI {

    private static likeDao: LikeDao | null = null;

    public static getInstance = () => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    userLikesTuit = async(uid: string, tid: string): Promise<Like> => {
        return LikeModel.findOne({tuit: tid, likedBy: uid}).then((like) => {
            return like === null ? LikeModel.create({tuit: tid, likedBy: uid}) : like;
        })
    }

    userUnlikesTuit = async(uid: string, tid: string): Promise<any> => {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }

    findAllUsersThatLikedTuit = async(tid: string): Promise<Like[]> => {
        return LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }

    findAllTuitsLikedByUser = async(uid: string): Promise<Like[]> => {
        return LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }

}