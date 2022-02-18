import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    private constructor() {}

    public static getInstance = () => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    userASendsMessageToUserB = async(uida: string, uidb: string, msg: string): Promise<Message> => {
        if (msg) {
            return MessageModel.create({sender: uida, receiver: uidb, message: msg});
        } else {
            throw "Empty message. Please check the request body."
        }
    }

    findSentMessagesByUser = async(uid: string): Promise<Message[]> => {
        return MessageModel.find({sender: uid}).populate("receiver").exec();
    }

    findReceivedMessagesByUser = async(uid: string): Promise<Message[]> => {
        return MessageModel.find({receiver: uid}).populate("sender").exec();
    }

    deleteMessage = async(uid: string, mid: string): Promise<any> => {
        return MessageModel.findOne({$or: [{_id: mid, sender: uid}, {_id: mid, receiver: uid}]})
            .then((msg) => {
                if (msg) {
                    return MessageModel.deleteOne({_id: mid});
                } else {
                    throw `User ${uid} is not authorized to delete message ${mid}`;
                }
            });
    }

}