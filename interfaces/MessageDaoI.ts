/**
 * @file Declares the MessageDao interface.
 */
import {Message} from "../models/Message";

export interface MessageDaoI {
    userASendsMessageToUserB(uida: string, uidb: string, msg: Message): Promise<Message>;
    findSentMessagesByUser(uid: string): Promise<Message[]>;
    findReceivedMessagesByUser(uid: string): Promise<Message[]>;
    deleteMessage(mid: string): Promise<any>;
    findAllMessages(): Promise<Message[]>;
}