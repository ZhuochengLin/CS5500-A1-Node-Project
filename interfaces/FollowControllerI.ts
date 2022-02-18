import {NextFunction, Request, Response} from "express";

export default interface FollowControllerI {
    userAFollowsUserB(req: Request, res: Response, next: NextFunction): void;
    userAUnfollowsUserB(req: Request, res: Response, next: NextFunction): void;
    findFollowersByUser(req: Request, res: Response, next: NextFunction): void;
    findFollowingsByUser(req: Request, res: Response, next: NextFunction): void;
}
