/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB.
 */
import {FollowDaoI} from "../interfaces/FollowDaoI";
import {Follow} from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

/**
 * Implements Data Access Object managing data storage of follows.
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Creates singleton DAO instance.
     * @returns {FollowDao} A DAO instance
     */
    public static getInstance = () => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    /**
     * Inserts a new record into the database that reflects "userA follows userB" relationship.
     * @param {string} uida UserA's primary key
     * @param {string} uidb UserB's primary key
     * @returns {Promise} To be notified when the follow is inserted into the database
     */
    userAFollowsUserB = async(uida: string, uidb: string): Promise<Follow> => {
        return FollowModel.findOne({user: uidb, followedBy: uida})
            .then((follows) => {
                return follows === null ? FollowModel.create({user: uidb, followedBy: uida}) : follows;
            });
    };

    /**
     * Deletes an existing record from the database that reflects "userA unfollows userB" relationship.
     * @param {string} uida UserA's primary key
     * @param {string} uidb UserB's primary key
     * @returns {Promise} To be notified when the follow is deleted from the database
     */
    userAUnfollowsUserB = async(uida: string, uidb: string): Promise<any> => {
        return FollowModel.deleteOne({user: uidb, followedBy: uida});
    }

    /**
     * Retrieved all the followers of the specified user from the database.
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the list of followers is retrieved from the database
     */
    findFollowersByUser = async(uid: string): Promise<Follow[]> => {
        return FollowModel.find({user: uid}).populate("followedBy").exec();
    }

    /**
     * Retrieved the list of users that are followed by the specified user.
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the list of users is retrieved from the database
     */
    findFollowingsByUser = async(uid: string): Promise<Follow[]> => {
        return FollowModel.find({followedBy: uid}).populate("user").exec();
    }

}