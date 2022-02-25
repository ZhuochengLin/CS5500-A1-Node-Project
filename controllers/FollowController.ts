/**
 * @file Controller RESTful web service API for follows resource
 */
import {FollowControllerI} from "../interfaces/FollowControllerI";
import {Express, NextFunction, Request, Response} from "express";
import {FollowDao} from "../daos/FollowDao";

/**
 * Implements RESTful Web service API for follows resource.
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing RESTful web service API
 */
export class FollowController implements FollowControllerI{

    private static followController: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {UserController} Singleton controller
     */
    public static getInstance = (app: Express) => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uida/follows/:uidb", FollowController.followController.userAFollowsUserB);
            app.delete("/api/users/:uida/follows/:uidb", FollowController.followController.userAUnfollowsUserB);
            app.get("/api/users/:uid/follows", FollowController.followController.findFollowingsByUser);
            app.get("/api/follows/:uid", FollowController.followController.findFollowersByUser);
            app.get("/api/follows", FollowController.followController.findAllFollows);
            app.delete("/api/follows", FollowController.followController.deleteAllFollows);
        }
        return FollowController.followController;
    }

    /**
     * Creates a new like instance.
     * @param {Request} req, Represents request from the client, including path parameters uida identifying the userA's
     * primary key and uidb identifying the userB's primary key
     * @param {Response} res Represents response to the client, including the body formatted as JSON containing the
     * new like that was inserted into the database
     * @param {NextFunction} next Error handling function
     */
    userAFollowsUserB = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.userAFollowsUserB(req.params.uida, req.params.uidb)
            .then((follow) => res.json(follow))
            .catch(next);
    }

    /**
     * Deletes a like instance from the database by the users' primary keys.
     * @param {Request} req Represents request from the client, including path parameters uida identifying the userA's
     * primary key and uidb identifying the userB's primary key
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    userAUnfollowsUserB = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.userAUnfollowsUserB(req.params.uida, req.params.uidb)
            .then((status) => res.json(status))
            .catch(next);
    }

    /**
     * Retrieves the users who follow the specified user.
     * @param {Request} req Represents request from the client, including path parameter uid
     * identifying the primary key of the user object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the users that follow the specified user
     * @param {NextFunction} next Error handling function
     */
    findFollowersByUser = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.findFollowersByUser(req.params.uid)
            .then((follows) => res.json(follows))
            .catch(next);
    }

    /**
     * Retrieves the users followed by the specified user
     * @param {Request} req Represents request from the client, including path parameter uid
     * identifying the primary key of the user object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the users that followed by the specified user
     * @param {NextFunction} next Error handling function
     */
    findFollowingsByUser = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.findFollowingsByUser(req.params.uid)
            .then((follows) => res.json(follows))
            .catch(next);
    }

    /**
     * Retrieves all follows records from the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client
     */
    findAllFollows = (req: Request, res: Response): void => {
        FollowController.followDao.findAllFollows()
            .then((likes) => res.json(likes));
    }

    /**
     * Deletes all follows records in the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client
     */
    deleteAllFollows = (req: Request, res: Response): void => {
        FollowController.followDao.deleteAllFollows().then((status) => res.json(status));
    }

}
