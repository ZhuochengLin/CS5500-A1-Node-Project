import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    public static getInstance = () => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    findAllTuits = async(): Promise<Tuit[]> => {
        return TuitModel.find();
    }

    findTuitById = async(tid: string): Promise<Tuit | null> => {
        return TuitModel.findById(tid);
    }

    findTuitsByUser = async(uid: string): Promise<Tuit[]> => {
        return TuitModel.find({postedBy: uid});
    }

    createTuit = async(tuit: Tuit): Promise<Tuit> => {
        return TuitModel.create(tuit);
    }

    updateTuit = async(tid: string, tuit: Tuit): Promise<any> => {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    deleteTuit = async(tid: string): Promise<any> => {
        return TuitModel.deleteOne({_id: tid});
    }

}