/**
 * @file Defines Bookmark interface that reflects "user bookmarks a tuit" relationship.
 */
import {Tuit} from "./Tuit";
import {User} from "./User";

export interface Bookmark {
    tuit: Tuit;
    bookmarkedBy: User;
}
