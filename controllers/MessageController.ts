/**
 * @file Controller RESTful web service API for messages resource
 */
import {MessageControllerI} from "../interfaces/MessageControllerI";
import {MessageDao} from "../daos/MessageDao";
import {Express, NextFunction, Request, Response} from "express";

/**
 * Implements RESTful Web service API for messages resource.
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing RESTful web service API
 */
export class MessageController implements MessageControllerI {

    private static messageController: MessageController | null = null;
    private static messageDao: MessageDao = MessageDao.getInstance();

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns {MessageController} Singleton controller
     */
    public static getInstance = (app: Express) => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uida/messages/:uidb", MessageController.messageController.userASendsMessageToUserB);
            app.get("/api/users/:uid/messages", MessageController.messageController.findSentMessagesByUser);
            app.get("/api/messages/:uid", MessageController.messageController.findReceivedMessagesByUser);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
            app.get("/api/messages", MessageController.messageController.findAllMessages);
            app.delete("/api/users/:uida/messages/:uidb", MessageController.messageController.deleteMessagesFromUserAToUserB);
        }
        return MessageController.messageController;
    }

    /**
     * Creates a new message instance.
     * @param {Request} req, Represents request from the client, including path parameters uida and uidb
     * identifying the primary key of the sender and the receiver adn the body containing the
     * JSON object for the new message to be inserted in the database
     * @param {Response} res Represents response to the client, including the body formatted as JSON containing the
     * new message that was inserted into the database
     * @param {NextFunction} next Error handling function
     */
    userASendsMessageToUserB = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.userASendsMessageToUserB(req.params.uida, req.params.uidb, req.body)
            .then((message) => res.json(message))
            .catch(next);
    }

    /**
     * Retrieves all messages sent from the specified user.
     * @param {Request} req Represents request from the client, including the path parameter uid
     * identifying the primary key of the user
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the message objects
     * @param {NextFunction} next Error handling function
     */
    findSentMessagesByUser = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.findSentMessagesByUser(req.params.uid)
            .then((messages) => res.json(messages))
            .catch(next);
    }

    /**
     * Retrieves all messages sent to the specified user.
     * @param {Request} req Represents request from the client, including the path parameter uid
     * identifying the primary key of the user
     * @param {Response} res Represents response to the client, including the body formatted
     * as JSON array containing the message objects
     * @param {NextFunction} next Error handling function
     */
    findReceivedMessagesByUser = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.findReceivedMessagesByUser(req.params.uid)
            .then((messages) => res.json(messages))
            .catch(next);
    }

    /**
     * Deletes a user's message using the user's primary key and the message's primary key.
     * @param {Request} req Represents request from the client, including the path parameter uid
     * identifying the primary key of the user and mid identifying the primary key of the message
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    deleteMessage = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then((status) => res.json(status))
            .catch(next);
    }

    /**
     * Deletes all messages sent from User A to User B.
     * @param {Request} req Represents request from the client, including the path parameter uida
     * and uidb identifying the primary key of User A and User B
     * @param {Response} res Represents response to the client, including status on
     * whether deleting was successful or not
     * @param {NextFunction} next Error handling function
     */
    deleteMessagesFromUserAToUserB = (req: Request, res: Response, next: NextFunction): void => {
        MessageController.messageDao.deleteMessagesFromUserAToUserB(req.params.uida, req.params.uidb)
            .then((status) => res.json(status))
            .catch(next);
    }

    /**
     * Retrieves all messages from the database.
     * @param {Request} req Represents request from the client
     * @param {Response} res Represents response to the client, including the body formatted as JSON array
     * containing the message objects
     */
    findAllMessages = (req: Request, res: Response): void => {
        MessageController.messageDao.findAllMessages()
            .then((messages) => res.json(messages));
    }
}



