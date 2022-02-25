/**
 * @file Declares the BookmarkDao interface.
 */
import {Bookmark} from "../models/Bookmark";

export interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
    findBookmarkedTuitsByUser(uid: string): Promise<Bookmark[]>;
    findUserWhoBookmarkedTuit(tid: string): Promise<Bookmark[]>;
    findAllBookmarks(): Promise<Bookmark[]>;
}
