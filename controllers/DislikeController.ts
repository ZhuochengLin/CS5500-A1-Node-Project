/**
 * @file Controller RESTful web service API for dislikes resource
 */
import {DislikeControllerI} from "../interfaces/DislikeControllerI";
import {Express, NextFunction, Request, Response} from "express";
import {DislikeDao} from "../daos/DislikeDao";
import {NoUserLoggedInError} from "../error_handlers/CustomErrors";

/**
 * Implements RESTful Web service API for dislikes resource.
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislike CRUD operations
 * @property {DislikeController} dislikeController Singleton controller implementing RESTful web service API
 */
export class DislikeController implements DislikeControllerI {

    private static dislikeController: DislikeController | null = null;
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {DislikeController} Singleton controller
     */
    public static getInstance = (app: Express) => {
        if (DislikeController.dislikeController == null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.findUserDislikedTuit);
            app.get("/api/dislikes", DislikeController.dislikeController.findAllDislikes);
            app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userUnlikesTuit);
            app.delete("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userLikesTuit);
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
        }
        return DislikeController.dislikeController;
    }

    /**
     * Handles dislike record when user likes a tuit.
     * @param {Request} req Represents request from the client, including the user's id and the tuit's id
     * @param {Response} res Represents response to the client, including the operation status
     * @param {NextFunction} next Error handling function
     */
    userLikesTuit = (req: Request, res: Response, next: NextFunction): void => {
        DislikeController.dislikeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then((status) => res.json(status))
            .catch(next);
    }

    /**
     * Creates a dislike record.
     * @param {Request} req Represents request from the client, including the user's id and the tuit's id
     * @param {Response} res Represents response to the client, including the dislike data
     * @param {NextFunction} next Error handling function
     */
    userUnlikesTuit = (req: Request, res: Response, next: NextFunction):void => {
        DislikeController.dislikeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then((dislike) => res.json(dislike))
            .catch(next);
    }

    /**
     * Retrieves all dislike records.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client, including all dislike records formatted as JSON object
     */
    findAllDislikes = (req: Request, res: Response): void => {
        DislikeController.dislikeDao.findAllDislikes()
            .then((dislikes) => res.json(dislikes));
    }

    /**
     * Finds "user dislikes a tuit" record.
     * @param {Request} req Represents request from the client, including the user's id and the tuit's id
     * @param {Response} res Represents response to the client, including the dislike record if exists
     * @param {NextFunction} next Error handling function
     */
    findUserDislikedTuit = (req: any, res: Response, next: NextFunction): void => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session["profile"];
        if (uid === "me" && !profile) {
            next(new NoUserLoggedInError());
            return
        }
        const userId = uid === "me" ? profile._id : uid;
        DislikeController.dislikeDao.findUserDislikedTuit(userId, tid)
            .then((dislike) => res.json(dislike))
            .catch(next);
    }

    /**
     * Finds all tuits disliked by the user.
     * @param {Request} req Represents request from the client, including the user's id
     * @param {Response} res Represents response to the client, including all the tuits disliked by the user
     * formatted as JSON object
     * @param {NextFunction} next Error handling function
     */
    findAllTuitsDislikedByUser = (req: any, res: Response, next: NextFunction): void => {
        const uid = req.params.uid;
        const profile = req.session["profile"];
        if (uid === "me" && !profile) {
            next(new NoUserLoggedInError());
            return
        }
        const userId = uid === "me" ? profile._id : uid;
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then((dislikes) => {
                const tuits = dislikes.map((dislike) => {
                    return dislike.tuit;
                });
                res.json(tuits);
            }).catch(next)
    }

}