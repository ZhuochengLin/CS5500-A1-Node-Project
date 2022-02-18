import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import {Express, NextFunction, Request, Response} from "express";

export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

    private constructor() {}

    public static getInstance = (app: Express) => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findBookmarkedTuitsByUser);
            app.get("/api/bookmarks", BookmarkController.bookmarkController.findAllBookmarks);
        }
        return BookmarkController.bookmarkController;
    }

    userBookmarksTuit = (req: Request, res: Response, next: NextFunction): void => {
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark) => res.json(bookmark))
            .catch(next);
    }

    userUnbookmarksTuit = (req: Request, res: Response, next: NextFunction): void => {
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then((status) => res.json(status))
            .catch(next);
    }

    findBookmarkedTuitsByUser = (req: Request, res: Response, next: NextFunction): void => {
        BookmarkController.bookmarkDao.findBookmarkedTuitsByUser(req.params.uid)
            .then((bookmarks) => res.json(bookmarks))
            .catch(next);
    }

    findAllBookmarks = (req: Request, res: Response): void => {
        BookmarkController.bookmarkDao.findAllBookmarks().then(
            (bookmarks) => res.json(bookmarks)
        );
    }

}