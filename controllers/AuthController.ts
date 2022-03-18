import {Express, NextFunction, Request, Response} from "express";
import {UserDao} from "../daos/UserDao";

const bcrypt = require("bcrypt");
const saltRounds = 10;

export class AuthController {

    private static userDao: UserDao = UserDao.getInstance();
    private static authController: AuthController | null = null;

    public static getInstance = (app: Express) => {
        if (AuthController.authController === null) {
            AuthController.authController = new AuthController();
            app.post("/api/auth/signup", AuthController.authController.signup);
        }
        return AuthController.authController;
    }

    signup = async (req: any, res: Response, next: NextFunction) => {
        const newUser = req.body;
        const password = newUser.password;
        bcrypt.hash(password, saltRounds)
            .then((hashedPassword: any) => {
                newUser.password = hashedPassword;
                AuthController.userDao.createUser(newUser)
                    .then((user) => {
                        user.password = "";
                        req.session["profile"] = user;
                        res.json(user);
                    })
                    .catch(next);
            })
            .catch(next);
    }

}
