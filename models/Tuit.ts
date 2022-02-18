import User from "./User";

export default interface Tuit {
    content: string;
    postedBy: User;
    postedOn: Date;
}
