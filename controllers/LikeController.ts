/**
 * @file Controller RESTful web service API for likes resource
 */
import {LikeControllerI} from "../interfaces/LikeControllerI";
import {Express, NextFunction, Request, Response} from "express";
import {LikeDao} from "../daos/LikeDao";

/**
 * Implements RESTful Web service API for likes resource.
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 * @property {LikeController} likeController Singleton controller implementing RESTful web service API
 */
export class LikeController implements LikeControllerI {

    private static likeController: LikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {};

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {LikeController} Singleton controller
     */
    public static getInstance = (app: Express) => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/likes/:tid", LikeController.likeController.userUnlikesTuit);
            app.get("/api/tuits/likes/:tid", LikeController.likeController.findAllUsersThatLikedTuit);
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/likes", LikeController.likeController.findAllLikes);
        }
        return LikeController.likeController;
    }

    /**
     * Creates a new like instance.
     * @param {Request} req, Represents request from the client, including path parameter uid identifying
     * the user's primary key and tid identifying the tuit's primary key
     * @param {Response} res Represents response to the client, including the body formatted as JSON containing the
     * new like that was inserted into the database
     * @param {NextFunction} next Error handling function
     */
    userLikesTuit = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then((tuit) => res.json(tuit))
            .catch(next);
    }

    /**
     * Deletes a like instance from the database by the primary keys of the user and the tuit.
     * @param {Request} req Represents request from the client, including the path parameter uid
     * identifying the primary key of the user and tid identifying the tuit's primary key
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    userUnlikesTuit = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then((status) => res.json(status))
            .catch(next);
    }

    /**
     * Retrieves the users who liked the specified tuit.
     * @param {Request} req Represents request from the client, including path parameter tid
     * identifying the primary key of the tuit object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the users that liked the tuit
     * @param {NextFunction} next Error handling function
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then((users) => res.json(users))
            .catch(next);
    }

    /**
     * Retrieves the tuits liked by the specified user.
     * @param {Request} req Represents request from the client, including path parameter uid
     * identifying the primary key of the user object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the tuits that liked by the user
     * @param {NextFunction} next Error handling function
     */
    findAllTuitsLikedByUser = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then((tuits) => res.json(tuits))
            .catch(next);
    }

    /**
     * Retrieves all likes from the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client
     */
    findAllLikes = (req: Request, res: Response): void => {
        LikeController.likeDao.findAllLikes()
            .then((likes) => res.json(likes));
    }

}
