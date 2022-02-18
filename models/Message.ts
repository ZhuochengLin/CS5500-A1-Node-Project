import User from "./User";

export default interface Message {
    sender: User;
    receiver: User;
    message: string;
    sentOn: Date;
}
