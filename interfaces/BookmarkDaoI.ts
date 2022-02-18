import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
    findBookmarkedTuitsByUser(uid: string): Promise<Bookmark[]>;
    findAllBookmarks(): Promise<Bookmark[]>;
}
