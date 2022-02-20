/**
 * @file Controller RESTful web service API for users resource
 */
import {UserControllerI} from "../interfaces/UserControllerI";
import {UserDao} from "../daos/UserDao";
import {Express, NextFunction, Request, Response} from "express";

/**
 * Implements RESTful Web service API for users resource.
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing RESTful web service API
 */
export class UserController implements UserControllerI {

    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {UserController} Singleton controller
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:userid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.delete("/api/users/:userid", UserController.userController.deleteUser);
            app.put("/api/users/:userid", UserController.userController.updateUser);
        }
        return UserController.userController;
    }

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Retrieves all users from the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the user objects
     */
    findAllUsers = (req: Request, res: Response) => {
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));
    }

    /**
     * Retrieves the user object by its primary key.
     * @param {Request} req Represents request from the client, including path parameter uid
     * identifying the primary key of the user object
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON containing the user that matches the user ID
     * @param {NextFunction} next Error handling function
     */
    findUserById = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user))
            .catch(next);
    }

    /**
     * Creates a new user instance.
     * @param {Request} req, Represents request from the client, including body containing the
     * JSON object for the new user to be inserted in the database
     * @param {Response} res Represents response to the client, including the body formatted as JSON containing the
     * new user that was inserted into the database
     * @param {NextFunction} next Error handling function
     */
    createUser = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user))
            .catch(next);
    }

    /**
     * Deletes a user instance from the database by its primary key.
     * @param {Request} req Represents request from the client, including the path parameter uid
     * identifying the primary key of the user to be deleted
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    deleteUser = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status))
            .catch(next);
    }

    /**
     * Modified an existing user instance.
     * @param {Request} req Represents request from the client, including the path parameter uid identifying
     * the primary key of the user, and the body containing properties with new values for the user
     * @param {Response} res Represents response to the client, including status on whether updating was
     * successful or not
     * @param next Error handling function
     */
    updateUser = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status))
            .catch(next);
    }

}
