import {NextFunction, Request, Response} from "express";

export default interface LikeControllerI {
    userLikesTuit(req: Request, res: Response, next: NextFunction): void;
    userUnlikesTuit(req: Request, res: Response, next: NextFunction): void;
    findAllUsersThatLikedTuit(req: Request, res: Response, next: NextFunction): void;
    findAllTuitsLikedByUser(req: Request, res: Response, next: NextFunction): void;
}
