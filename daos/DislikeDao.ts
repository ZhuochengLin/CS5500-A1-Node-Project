import {DislikeDaoI} from "../interfaces/DislikeDaoI";
import dislikeModel from "../mongoose/DislikeModel";
import {Dislike} from "../models/Dislike";
import {UserDao} from "./UserDao";
import {TuitDao} from "./TuitDao";
import {NoSuchTuitError, NoSuchUserError} from "../error_handlers/CustomErrors";
import DislikeModel from "../mongoose/DislikeModel";

export class DislikeDao implements DislikeDaoI {

    private static dislikeDao: DislikeDao | null = null;

    public static getInstance = () => {
        if (DislikeDao.dislikeDao == null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return dislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    userUnlikesTuit = async (uid: string, tid: string): Promise<Dislike> => {
        const user = await UserDao.getInstance().findUserById(uid);
        const tuit = await TuitDao.getInstance().findTuitById(tid);
        if (user) {
            if (tuit) {
                return DislikeModel.findOne({tuit: tid, dislikedBy: uid}).then((dislike) => {
                    return dislike === null ? DislikeModel.create({tuit: tid, dislikedBy: uid}) : dislike;
                })
            } else {
                throw new NoSuchTuitError()
            }
        } else {
            throw new NoSuchUserError();
        }
    }

    findUserDislikedTuit = async (uid: string, tid: string): Promise<Dislike | null> => {
        return dislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }

    findAllDislikes = async (): Promise<Dislike[]> => {
        return dislikeModel.find();
    }

    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> => {
        return dislikeModel.find({dislikedBy: uid}).populate(["tuit", "dislikedBy"]).exec();
    }

    countHowManyDislikedTuit = async (tid: string): Promise<number> => {
        return dislikeModel.countDocuments({tuit: tid});
    }

}