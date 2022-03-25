import {Express, NextFunction, Response} from "express";
import {UserDao} from "../daos/UserDao";
import {DuplicateUserError, NoUserLoggedInError} from "../error_handlers/CustomErrors";

const bcrypt = require("bcrypt");
const saltRounds = 10;

export class AuthController {

    private static userDao: UserDao = UserDao.getInstance();
    private static authController: AuthController | null = null;

    public static getInstance = (app: Express) => {
        if (AuthController.authController === null) {
            AuthController.authController = new AuthController();
            app.get("/api/auth/profile", AuthController.authController.profile);
            app.post("/api/auth/signup", AuthController.authController.signup);
            app.post("/api/auth/logout", AuthController.authController.logout);
        }
        return AuthController.authController;
    }

    signup = async (req: any, res: Response, next: NextFunction) => {
        const newUser = req.body;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltRounds);
        const existingUser = await AuthController.userDao.findUserByName(newUser.username);
        if (existingUser) {
            next(new DuplicateUserError(newUser.username));
        } else {
            const insertedUser = await AuthController.userDao.createUser(newUser);
            insertedUser.password = "";
            req.session["profile"] = insertedUser;
            res.json(insertedUser);
        }
    }

    profile = (req: any, res: Response, next: NextFunction) => {
        const profile = req.session["profile"];
        console.log(profile)
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            next(new NoUserLoggedInError());
        }
    }

    logout = (req: any, res: Response) => {
        req.session.destroy();
        res.sendStatus(200);
    }

}
