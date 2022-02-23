/**
 * @file Controller RESTful web service API for tuits resource
 */
import {TuitControllerI} from "../interfaces/TuitControllerI";
import {Express, NextFunction, Request, Response} from "express";
import {TuitDao} from "../daos/TuitDao";

/**
 * Implements RESTful Web service API for tuits resource.
 * @property {TuitDao} tuitDao Singleton DAO implementing tuits CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing RESTful web service API
 */
export class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {TuitController} Singleton controller
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/tuits/:tuitid", TuitController.tuitController.findTuitById);
            app.get("/api/users/:userid/tuits", TuitController.tuitController.findTuitsByUser);
            app.post("/api/users/:userid/tuits/", TuitController.tuitController.createTuitByUser);
            app.delete("/api/tuits/:tuitid", TuitController.tuitController.deleteTuit);
            app.put("/api/tuits/:tuitid", TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Retrieves all tuits from the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the tuits objects
     */
    findAllTuits = (req: Request, res: Response): void => {
        TuitController.tuitDao.findAllTuits()
            .then(tuis => res.json(tuis));
    }

    /**
     * Retrieves the tuit object by its primary key.
     * @param {Request} req Represents request from the client, including path parameter tid
     * identifying the primary key of the tuit object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON containing the tuit that matches the tuit ID
     * @param {NextFunction} next Error handling function
     */
    findTuitById = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit))
            .catch(next);
    }

    /**
     * Retrieves all the tuits posted by the specified user.
     * @param {Request} req Represents request from the client, including path parameter uid
     * identifying the primary key of the user
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the tuits posted by the user
     * @param {NextFunction} next Error handling function
     */
    findTuitsByUser = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits))
            .catch(next);
    }

    /**
     * Creates a new tuit instance.
     * @param {Request} req, Represents request from the client, including path parameter userid
     * identifying the user's primary key and the body containing the
     * JSON object for the new tuit to be inserted in the database
     * @param {Response} res Represents response to the client, including the body formatted as JSON containing the
     * new tuit that was inserted into the database
     * @param {NextFunction} next Error handling function
     */
    createTuitByUser = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.createTuitByUser(req.params.userid, req.body)
            .then(tuit => res.json(tuit))
            .catch(next);
    }

    /**
     * Deletes a tuit instance from the database by its primary key.
     * @param {Request} req Represents request from the client, including the path parameter tid
     * identifying the primary key of the tuit to be deleted
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    deleteTuit = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status))
            .catch(next);
    }

    /**
     * Modified an existing tuit instance.
     * @param {Request} req Represents request from the client, including the path parameter tid identifying
     * the primary key of the tuit, and the body containing properties with new values for the tuit
     * @param {Response} res Represents response to the client, including status on whether updating was
     * successful or not
     * @param next Error handling function
     */
    updateTuit = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status))
            .catch(next);
    }
}
