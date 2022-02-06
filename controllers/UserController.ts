import UserControllerI from "../interfaces/UserControllerI";
import UserDao from "../daos/UserDao";
import {Express, NextFunction, Request, Response} from "express";

export default class UserController implements UserControllerI {

    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

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

    constructor() {}

    findAllUsers = (req: Request, res: Response) => {
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));
    }

    findUserById = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user))
            .catch(next);
    }

    createUser = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user))
            .catch(next);
    }

    deleteUser = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status))
            .catch(next);
    }

    updateUser = (req: Request, res: Response, next: NextFunction) => {
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status))
            .catch(next);
    }

}