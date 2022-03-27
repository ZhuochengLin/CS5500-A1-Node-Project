import {DislikeControllerI} from "../interfaces/DislikeControllerI";
import {Express, NextFunction, Request, Response} from "express";
import {DislikeDao} from "../daos/DislikeDao";
import {NoUserLoggedInError} from "../error_handlers/CustomErrors";

export class DislikeController implements DislikeControllerI {

    private static dislikeController: DislikeController | null = null;
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();

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

    userLikesTuit = (req: Request, res: Response, next: NextFunction): void => {
        DislikeController.dislikeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then((status) => res.json(status))
            .catch(next);
    }

    userUnlikesTuit = (req: Request, res: Response, next: NextFunction):void => {
        DislikeController.dislikeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then((dislike) => res.json(dislike))
            .catch(next);
    }

    findAllDislikes = (req: Request, res: Response): void => {
        DislikeController.dislikeDao.findAllDislikes()
            .then((dislikes) => res.json(dislikes));
    }

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
                const tuits = dislikes.map((dislike) => dislike.tuit);
                res.json(tuits);
            }).catch(next)
    }

}