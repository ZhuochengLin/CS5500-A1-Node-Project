import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, NextFunction, Request, Response} from "express";

export default class MessageController implements MessageControllerI {

    private static messageController: MessageController | null = null;
    private static messageDao: MessageDao = MessageDao.getInstance();

    private constructor() {}

    public static getInstance = (app: Express) => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uida/messages/:uidb", MessageController.messageController.userASendsMessageToUserB);
            app.get("/api/users/:uid/messages", MessageController.messageController.findSentMessagesByUser);
            app.get("/api/messages/:uid", MessageController.messageController.findReceivedMessagesByUser);
            app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    userASendsMessageToUserB = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.userASendsMessageToUserB(req.params.uida, req.params.uidb, req.body["message"])
            .then((message) => res.json(message))
            .catch(next);
    }

    findSentMessagesByUser = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.findSentMessagesByUser(req.params.uid)
            .then((messages) => res.json(messages))
            .catch(next);
    }

    findReceivedMessagesByUser = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.findReceivedMessagesByUser(req.params.uid)
            .then((messages) => res.json(messages))
            .catch(next);
    }

    deleteMessage = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.deleteMessage(req.params.uid, req.params.mid)
            .then((status) => res.json(status))
            .catch(next);
    }

}

