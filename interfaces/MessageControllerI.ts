/**
 * @file Declares the MessageController interface.
 */
import {NextFunction, Request, Response} from "express";

export interface MessageControllerI {
    userASendsMessageToUserB(req: Request, res: Response, next: NextFunction): void;
    findSentMessagesByUser(req: Request, res: Response, next: NextFunction): void;
    findReceivedMessagesByUser(req: Request, res: Response, next: NextFunction): void;
    deleteMessage(req: Request, res: Response, next: NextFunction): void;
}