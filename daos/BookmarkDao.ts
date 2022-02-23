/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB.
 */
import {BookmarkDaoI} from "../interfaces/BookmarkDaoI";
import {Bookmark} from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import {UserDao} from "./UserDao";
import {TuitDao} from "./TuitDao";

/**
 * Implements Data Access Object managing data storage of bookmarks.
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Creates singleton DAO instance.
     * @returns {BookmarkDao} A DAO instance
     */
    public static getInstance = () => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    /**
     * Inserts a new record into the database that reflects "user bookmarks a tuit" relationship.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the bookmark is inserted into the database
     */
    userBookmarksTuit = async(uid: string, tid: string): Promise<Bookmark> => {
        const user = await UserDao.getInstance().findUserById(uid);
        const tuit = await TuitDao.getInstance().findTuitById(tid);
        if (user) {
            if (tuit) {
                return BookmarkModel.findOne({tuit: tid, bookmarkedBy: uid})
                    .then((bookmark) => {
                        return bookmark === null ? BookmarkModel.create({tuit: tid, bookmarkedBy: uid}) : bookmark;
                    });
            } else {
                throw new ReferenceError(`Tuit ${tid} does not exist.`)
            }
        } else {
            throw new ReferenceError(`User ${uid} does not exist.`);
        }
    }

    /**
     * Deletes an existing record from the database to reflect "user unbookmarks a tuit" relationship.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @return {Promise} To be notified when the bookmark is inserted into the database
     */
    userUnbookmarksTuit = async(uid:string, tid: string): Promise<any> => {
        return BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
    }

    /**
     * Retrieves a list of tuits that are bookmarked by the specified user from the database.
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the list of tuits is retrieved from the database
     */
    findBookmarkedTuitsByUser = async(uid: string): Promise<Bookmark[]> => {
        return BookmarkModel.find({bookmarkedBy: uid}).populate("tuit").exec();
    }

    /**
     * Retrieves all the bookmarks from the database.
     * @returns {Promise} To be notified when the list of bookmarks is retrieved
     */
    findAllBookmarks = async(): Promise<Bookmark[]> => {
        return BookmarkModel.find();
    }

}