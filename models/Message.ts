import User from "./User";

export default interface Message {

    sender: User;
    receiver: User;
    content: string;
    sentOn: Date;

}