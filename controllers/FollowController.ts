import FollowControllerI from "../interfaces/FollowControllerI";
import {Express, NextFunction, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI{

    private static followController: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();

    private constructor() {}

    public static getInstance = (app: Express) => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uida/follows/:uidb", FollowController.followController.userAFollowsUserB);
            app.delete("/api/users/:uida/follows/:uidb", FollowController.followController.userAUnfollowsUserB);
            app.get("/api/users/:uid/follows", FollowController.followController.findFollowingsByUser);
            app.get("/api/follows/:uid", FollowController.followController.findFollowersByUser);
        }
        return FollowController.followController;
    }

    userAFollowsUserB = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.userAFollowsUserB(req.params.uida, req.params.uidb)
            .then((follow) => res.json(follow))
            .catch(next);
    }

    userAUnfollowsUserB = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.userAUnfollowsUserB(req.params.uida, req.params.uidb)
            .then((status) => res.json(status))
            .catch(next);
    }

    findFollowersByUser = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.findFollowersByUser(req.params.uid)
            .then((follows) => res.json(follows))
            .catch(next);
    }

    findFollowingsByUser = (req: Request, res: Response, next: NextFunction): void => {
        FollowController.followDao.findFollowingsByUser(req.params.uid)
            .then((follows) => res.json(follows))
            .catch(next);
    }

}
