import Message from "../models/Message";

export default interface MessageDaoI {
    userASendsMessageToUserB(uida: string, uidb: string, msg: string): Promise<Message>;
    findSentMessagesByUser(uid: string): Promise<Message[]>;
    findReceivedMessagesByUser(uid: string): Promise<Message[]>;
    deleteMessage(uid: string, mid: string): Promise<any>;
}