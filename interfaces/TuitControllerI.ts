/**
 * @file Declares the TuitController interface.
 */
import {NextFunction, Request, Response} from "express";

export interface TuitControllerI {
    findAllTuits(req: Request, res: Response): void;
    findTuitById(req: Request, res: Response, next: NextFunction): void;
    findTuitsByUser(req: Request, res: Response, next: NextFunction): void;
    createTuit(req: Request, res: Response, next: NextFunction): void;
    updateTuit(req: Request, res: Response, next: NextFunction): void;
    deleteTuit(req: Request, res: Response, next: NextFunction): void;
}
