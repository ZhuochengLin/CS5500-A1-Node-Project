import {NextFunction, Request, Response} from "express";

export interface DislikeControllerI {
    userLikesTuit(req: Request, res: Response, next: NextFunction): void;
    userUnlikesTuit(req: Request, res: Response, next: NextFunction): void;
    findAllDislikes(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: any, res: Response, next: NextFunction): void;
}