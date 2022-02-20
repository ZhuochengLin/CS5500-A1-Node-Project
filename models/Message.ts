/**
 * @file Defines Message interface that reflects "user sends a message to another user" relationship.
 */
import {User} from "./User";

export interface Message {
    sender: User;
    receiver: User;
    message: string;
    sentOn: Date;
}
