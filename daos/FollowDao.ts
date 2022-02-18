import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    private constructor() {}

    public static getInstance = () => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    userAFollowsUserB = async(uida: string, uidb: string): Promise<Follow> => {
        return FollowModel.findOne({user: uidb, followedBy: uida})
            .then((follows) => {
                return follows === null ? FollowModel.create({user: uidb, followedBy: uida}) : follows;
            });
    };

    userAUnfollowsUserB = async(uida: string, uidb: string): Promise<any> => {
        return FollowModel.deleteOne({user: uidb, followedBy: uida});
    }

    findFollowersByUser = async(uid: string): Promise<Follow[]> => {
        return FollowModel.find({user: uid}).populate("followedBy").exec();
    }

    findFollowingsByUser = async(uid: string): Promise<Follow[]> => {
        return FollowModel.find({followedBy: uid}).populate("user").exec();
    }

}