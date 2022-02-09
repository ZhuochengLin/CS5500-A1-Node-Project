import Tuit from "./Tuit";
import User from "./User";

export default interface Bookmark {
    tuit: Tuit;
    bookmarkedBy: User;
}