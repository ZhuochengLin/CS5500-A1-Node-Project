/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB.
 */
import {UserDaoI} from "../interfaces/UserDaoI";
import {User} from "../models/User";
import UserModel from "../mongoose/UserModel";

/**
 * Implements Data Access Object managing data storage of users.
 * @property {UserDao} userDao Private single instance of UserDao
 */
export class UserDao implements UserDaoI {

    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance.
     * @returns {UserDao} A DAO instance
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Uses UserModel to retrieve all users documents from "users" collection.
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    findAllUsers = async() : Promise<User[]> => {
        return UserModel.find({});
    }

    /**
     * Uses UserModel to retrieve single user document from "users" collection.
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when user is retrieved from the database
     */
    findUserById = async(uid: string): Promise<User | null> =>{
        return UserModel.findById(uid);
    }

    /**
     * Inserts user instance into the database.
     * @param {User} user Instance to be inserted
     * @returns {Promise} To be notified when user is inserted into the database
     */
    createUser = async(user:User): Promise<User> => {
        return UserModel.create(user);
    }

    /**
     *Updates user with new values in database.
     * @param {string} uid Primary of the user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns {Promise} To be notified when user is updated in the database
     */
    updateUser = async(uid: string, user: User): Promise<any> => {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of the user to be removed
     * @returns {Promise} To be notified when the user is removed from the database
     */
    deleteUser = async(uid: string): Promise<any> => {
        return UserModel.deleteOne({_id: uid});
    }

}