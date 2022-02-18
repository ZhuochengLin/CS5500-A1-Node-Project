import {NextFunction, Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response, next: NextFunction): void;
    userUnbookmarksTuit(req: Request, res: Response, next: NextFunction): void;
    findBookmarkedTuitsByUser(req: Request, res: Response, next: NextFunction): void;
    findAllBookmarks(req: Request, res: Response): void;
}
