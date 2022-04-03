/**
 * @file Implements DAO managing data storage of dislikes.
 */
import {DislikeDaoI} from "../interfaces/DislikeDaoI";
import dislikeModel from "../mongoose/DislikeModel";
import {Dislike} from "../models/Dislike";
import {UserDao} from "./UserDao";
import {TuitDao} from "./TuitDao";
import {NoSuchTuitError, NoSuchUserError} from "../error_handlers/CustomErrors";
import DislikeModel from "../mongoose/DislikeModel";

/**
 * Implements Data Access Object managing data storage of dislikes.
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 **/
export class DislikeDao implements DislikeDaoI {

    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance.
     * @returns {DislikeDao} A DAO instance
     */
    public static getInstance = () => {
        if (DislikeDao.dislikeDao == null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    /**
     * Deletes "user dislikes a tuit" record when the user likes the tuit.
     * @param {string} uid The user's primary key
     * @param {string} tid The tuit's primary key
     * @return {Promise} To be notified when the dislike is deleted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return dislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Inserts a new data record into the database that reflects "user dislikes a tuit" relationship.
     * @param {string} uid The user's primary key
     * @param {string} tid The tuit's primary key
     * @return {Promise} To be notified when the dislike is inserted into the database
     */
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

    /**
     * Finds "user dislikes a tuit" record
     * @param {string} uid The user's primary key
     * @param {string} tid The tuit's primary key
     * @return {Promise} To be notified when the dislike is found
     */
    findUserDislikedTuit = async (uid: string, tid: string): Promise<Dislike | null> => {
        return dislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Reads all the dislike records from the database.
     * @returns {Promise} To be notified when the list of dislikes are retrieved from the database
     */
    findAllDislikes = async (): Promise<Dislike[]> => {
        return dislikeModel.find();
    }

    /**
     * Reads a list of tuits that are disliked by a specified user.
     * @param {string} uid The user's primary key
     * @returns {Promise} To be notified when the list of tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> => {
        return dislikeModel.find({dislikedBy: uid}).populate(
            {path: "tuit", populate: {path: "postedBy"}}).exec();
    }

    /**
     * Counts how many users disliked the tuit
     * @param {string} tid The tuit's primary key
     * @return {Promise} To be notified when the count is collected
     */
    countHowManyDislikedTuit = async (tid: string): Promise<number> => {
        return dislikeModel.countDocuments({tuit: tid});
    }

}