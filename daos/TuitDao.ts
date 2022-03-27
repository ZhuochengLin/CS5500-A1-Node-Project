/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel to integrate with MongoDB.
 */
import {TuitDaoI} from "../interfaces/TuitDaoI";
import {Tuit} from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import {UserDao} from "./UserDao";
import tuitModel from "../mongoose/TuitModel";
import {EmptyTuitError} from "../error_handlers/CustomErrors";

/**
 * Implements Data Access Object managing data storage of Tuits.
 * @property {TuitDao} tuiDao Private single instance of TuitDao
 */
export class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    private constructor() {}

    /**
     * Creates singleton DAO instance.
     * @returns {TuitDao} A DAO instance
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    /**
     * Uses TuitModel to retrieve all the tuits from "tuits" collection.
     * @returns {Promise} To be notified when the tuits are retrieved from the database
     */
    findAllTuits = async(): Promise<Tuit[]> => {
        return TuitModel.find().populate("postedBy").exec();
    }

    /**
     * Uses TuitModel to retrieve a tuit using its primary key.
     * @param {string} tid The primary key of a tuit
     * @returns {Promise} To be notified when the tuit is retrieved from the database
     */
    findTuitById = async(tid: string): Promise<Tuit | null> => {
        return TuitModel.findOne({_id: tid});
    }

    /**
     * Uses TuitModel to retrieve all the tuits of a user using the user's primary key.
     * @param {string} uid The user's primary key
     * @returns {Promise} To be notified when the tuits are retrieved from the database
     */
    findTuitsByUser = async(uid: string): Promise<Tuit[]> => {
        return TuitModel.find({postedBy: uid}).populate("postedBy");
    }

    /**
     * Inserts a new tuit instance to the databse.
     * @param {string} uid The user's primary key
     * @param {Tuit} tuit The new tuit instance
     * @returns {Promise} To be notified when the tuit is inserted
     */
    createTuitByUser = async(uid: string, tuit: Tuit): Promise<Tuit> => {
        return UserDao.getInstance().findUserById(uid)
            .then((user) => {
                if (user) {
                    if (!tuit.tuit) {
                        throw new EmptyTuitError();
                    }
                    return TuitModel.create({...tuit, postedBy: uid});
                } else {
                    throw new ReferenceError(`User ${uid} does not exist.`);
                }
            })
    }

    /**
     * Updates an existing tuit with new values in the database.
     * @param {string} tid The tuit's primary key
     * @param {Tuit} tuit A Tuit object containing properties and their new values
     * @returns {Promise} To be notified when the tuit is inserted into the database
     */
    updateTuit = async(tid: string, tuit: Tuit): Promise<any> => {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Deletes an existing tuit using its primary key.
     * @param {string} tid The tuit's primary key
     * @returns {Promise} To be notified when the tuit is deleted from the database
     */
    deleteTuit = async(tid: string): Promise<any> => {
        return TuitModel.deleteOne({_id: tid});
    }

}