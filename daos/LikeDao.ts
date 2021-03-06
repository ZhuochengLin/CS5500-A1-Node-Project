/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB.
 */
import {LikeDaoI} from "../interfaces/LikeDaoI";
import {Like} from "../models/Like";
import LikeModel from "../mongoose/LikeModel";

/**
 * * Implements Data Access Object managing data storage of likes.
 *  * @property {LikeDao} likeDao Private single instance of LikeDao
 *  */
export class LikeDao implements LikeDaoI {

    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance.
     * @returns {LikeDao} A DAO instance
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Inserts a new data record into the database that reflects "user likes a tuit" relationship.
     * @param {string} uid The user's primary key
     * @param {string} tid The tuit's primary key
     * @return {Promise} To be notified when the like is inserted into the database
     */
    userLikesTuit = async(uid: string, tid: string): Promise<Like> => {
        return LikeModel.findOne({tuit: tid, likedBy: uid}).then((like) => {
            return like === null ? LikeModel.create({tuit: tid, likedBy: uid}) : like;
        })
    }

    /**
     * Deletes a like record from the database to reflect "user unlikes a tuit" relationship.
     * @param {string} uid The user's primary key
     * @param {string} tid The tuit's primary key
     * @returns {Promise} To be notified when the like is deleted from the database
     */
    userUnlikesTuit = async(uid: string, tid: string): Promise<any> => {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }

    /**
     * Reads a list of users who liked a specified tuit.
     * @param tid The tuit's primary key
     * @returns {Promise} To be notified when the list of users is retrieved from the database
     */
    findAllUsersThatLikedTuit = async(tid: string): Promise<Like[]> => {
        return LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }

    /**
     * Reads a list of tuits that are liked by a specified user.
     * @param {string} uid The user's primary key
     * @returns {Promise} To be notified when the list of tuits are retrieved from the database
     */
    findAllTuitsLikedByUser = async(uid: string): Promise<Like[]> => {
        return LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }

}