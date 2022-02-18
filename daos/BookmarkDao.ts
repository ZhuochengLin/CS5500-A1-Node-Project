import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    private constructor() {}

    public static getInstance = () => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    userBookmarksTuit = async(uid: string, tid: string): Promise<Bookmark> => {
        return BookmarkModel.findOne({tuit: tid, bookmarkedBy: uid})
            .then((bookmark) => {
                return bookmark === null ? BookmarkModel.create({tuit: tid, bookmarkedBy: uid}) : bookmark;
            });
    }

    userUnbookmarksTuit = async(uid:string, tid: string): Promise<any> => {
        return BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
    }

    findBookmarkedTuitsByUser = async(uid: string): Promise<Bookmark[]> => {
        return BookmarkModel.find({bookmarkedBy: uid}).populate("tuit").exec();
    }

    findAllBookmarks = async(): Promise<Bookmark[]> => {
        return BookmarkModel.find();
    }

}