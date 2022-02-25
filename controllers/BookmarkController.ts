/**
 * @file Controller RESTful web service API for bookmarks resource
 */
import {BookmarkControllerI} from "../interfaces/BookmarkControllerI";
import {BookmarkDao} from "../daos/BookmarkDao";
import {Express, NextFunction, Request, Response} from "express";

/**
 * Implements RESTful Web service API for bookmarks resource.
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing RESTful web service API
 */
export class BookmarkController implements BookmarkControllerI {

    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {BookmarkController} Singleton controller
     */
    public static getInstance = (app: Express) => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findBookmarkedTuitsByUser);
            app.get("/api/bookmarks", BookmarkController.bookmarkController.findAllBookmarks);
            app.get("/api/bookmarks/:tid", BookmarkController.bookmarkController.findUserWhoBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }

    /**
     * Creates a new bookmark instance.
     * @param {Request} req, Represents request from the client, including path parameters uid identifying the
     * user's primary key and tid identifying the tuit's primary key
     * @param {Response} res Represents response to the client, including the body formatted as JSON containing the
     * new bookmark that was inserted into the database
     * @param {NextFunction} next Error handling function
     */
    userBookmarksTuit = (req: Request, res: Response, next: NextFunction): void => {
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark) => res.json(bookmark))
            .catch(next);
    }

    /**
     * Deletes a bookmark instance from the database by the primary keys of the user and the tuit.
     * @param {Request} req Represents request from the client, including the path parameters uid
     * identifying the user's primary key and tid identifying the tuit's primary key
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    userUnbookmarksTuit = (req: Request, res: Response, next: NextFunction): void => {
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then((status) => res.json(status))
            .catch(next);
    }

    /**
     * Retrieves the tuits bookmarked by the specified user.
     * @param {Request} req Represents request from the client, including path parameter uid
     * identifying the primary key of the user object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the tuits that bookmarked by the user
     * @param {NextFunction} next Error handling function
     */
    findBookmarkedTuitsByUser = (req: Request, res: Response, next: NextFunction): void => {
        BookmarkController.bookmarkDao.findBookmarkedTuitsByUser(req.params.uid)
            .then((bookmarks) => res.json(bookmarks))
            .catch(next);
    }

    /**
     * Retrieves a list of users who bookmarked the specified tuit.
     * @param {Request} req Represents request from the client, including path parameter tid
     * identifying the primary key of the tuit object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the users who bookmarked the tuit
     * @param {NextFunction} next Error handling function
     */
    findUserWhoBookmarkedTuit = (req: Request, res: Response, next: NextFunction) => {
        BookmarkController.bookmarkDao.findUserWhoBookmarkedTuit(req.params.tid)
            .then((bookmarks) => res.json(bookmarks))
            .catch(next);
    }

    /**
     * Retrieves all bookmarks from the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the bookmark objects
     */
    findAllBookmarks = (req: Request, res: Response): void => {
        BookmarkController.bookmarkDao.findAllBookmarks().then(
            (bookmarks) => res.json(bookmarks)
        );
    }

}