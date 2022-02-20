/**
 * @file Declares the MessageDao interface.
 */
import {Message} from "../models/Message";

export interface MessageDaoI {
    userASendsMessageToUserB(uida: string, uidb: string, msg: string): Promise<Message>;
    findSentMessagesByUser(uid: string): Promise<Message[]>;
    findReceivedMessagesByUser(uid: string): Promise<Message[]>;
    deleteMessage(uid: string, mid: string): Promise<any>;
}