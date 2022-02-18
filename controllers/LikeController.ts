import LikeControllerI from "../interfaces/LikeControllerI";
import {Express, NextFunction, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";

export default class LikeController implements LikeControllerI {

    private static likeController: LikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();

    private constructor() {};

    public static getInstance = (app: Express) => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/likes/:tid", LikeController.likeController.userUnlikesTuit);
            app.get("/api/tuits/likes/:tid", LikeController.likeController.findAllUsersThatLikedTuit);
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        }
        return LikeController.likeController;
    }

    userLikesTuit = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then((tuit) => res.json(tuit))
            .catch(next);
    }

    userUnlikesTuit = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then((status) => res.json(status))
            .catch(next);
    }

    findAllUsersThatLikedTuit = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then((users) => res.json(users))
            .catch(next);
    }

    findAllTuitsLikedByUser = (req: Request, res: Response, next: NextFunction): void => {
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then((tuits) => res.json(tuits))
            .catch(next);
    }

}
