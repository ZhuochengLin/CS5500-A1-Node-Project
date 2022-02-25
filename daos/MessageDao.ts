/**
 * @file Implements DAO managing the data storage of messages.
 * Uses mongoose MessageModel to integrate with MongoDB.
 */
import {MessageDaoI} from "../interfaces/MessageDaoI";
import {Message} from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import {Error} from "mongoose";
import {UserDao} from "./UserDao";
import e from "express";

/**
 * Implements Data Access Object managing the data storage of messages.
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * A private constructor for singleton pattern.
     * @private
     */
    private constructor() {}

    /**
     * Creates singleton DAO instance.
     * @returns {MessageDao} A DAO instance
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    /**
     * Inserts a new data record in the database that reflects "userA sends a message to userB" relationship.
     * @param {string} uida UserA's primary key (sender)
     * @param {string} uidb UserB's primary key (receiver)
     * @param {Message} msg Message content
     * @returns {Promise} To be notified when the message is inserted
     */
    userASendsMessageToUserB = async(uida: string, uidb: string, msg: Message): Promise<Message> => {
        const msg_content = msg["message"];
        if (msg_content) {
            const userA = await UserDao.getInstance().findUserById(uida);
            const userB = await UserDao.getInstance().findUserById(uidb);
            if (userA) {
                if (userB) {
                    return MessageModel.create({...msg, sender: uida, receiver: uidb});
                } else {
                    throw new ReferenceError(`Receiver ${uidb} does not exist.`);
                }
            } else {
                throw new ReferenceError(`Sender ${uida} does not exist.`);
            }
        } else {
            throw new RangeError("Empty message. Please check the request body.");
        }
    }

    /**
     * Reads all the messages sent by the specified user from the database.
     * @param {string} uid The user's primary key
     * @returns {Promise} To be notified when the messages are retrieved from the database
     */
    findSentMessagesByUser = async(uid: string): Promise<Message[]> => {
        return MessageModel.find({sender: uid}).populate("receiver").exec();
    }

    /**
     * Reads all the messages received by the specified user from the database.
     * @param {string} uid The user's primary key
     * @returns {Promise} To be notified when the messages are retrieved from the database
     */
    findReceivedMessagesByUser = async(uid: string): Promise<Message[]> => {
        return MessageModel.find({receiver: uid}).populate("sender").exec();
    }

    /**
     * Deletes a user's message from the database.
     * @param {string} mid The message's primary key
     * @throws {Error} If the message is not sent to/from the user
     * @returns {Promise} To be notified when the message is deleted
     */
    deleteMessage = async(mid: string): Promise<any> => {
        return MessageModel.deleteOne({_id: mid});
    }

    /**
     * Deletes all messages sent from User A to User B.
     * @param {string} uida User A's primary key
     * @param {string} uidb User B's primary key
     * @returns {Promise} To be notified when the messages are deleted.
     */
    deleteMessagesFromUserAToUserB = async(uida: string, uidb: string): Promise<any> => {
        if (uida === uidb) {
            throw new Error("User cannot send messages to himself/herself.");
        }
        return MessageModel.deleteMany({sender: uida, receiver: uidb});
    }

    /**
     * Retrieves all messages from the database.
     * @returns {Promise} To be notified when the messages are retrieved
     */
    findAllMessages = async(): Promise<Message[]> => {
        return MessageModel.find();
    }

}