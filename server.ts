/**
 * @file Implements an Express Node HTTP server. Declares RESTful web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>follows</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database service.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import {config} from "dotenv";
import {logErrors} from "./error_handlers/logErrors";
import {dbErrorHandler} from "./error_handlers/dbErrorHandler";
import {errorHandler} from "./error_handlers/errorHandler";
import {TuitController} from "./controllers/TuitController";
import {UserController} from "./controllers/UserController";
import {LikeController} from "./controllers/LikeController";
import {FollowController} from "./controllers/FollowController";
import {BookmarkController} from "./controllers/BookmarkController";
import {MessageController} from "./controllers/MessageController";

config();
const app = express();
app.use(express.json());
app.get('/hello', (req: Request, res: Response) => res.send('Hello World!'));
app.get('/add/:a/:b', (req: Request, res: Response) => res.send(req.params.a + req.params.b));
mongoose.connect(`${process.env.DB_URI}`, (err) => {
    if (err) throw err;
    console.log("Mongoose connected!");
});

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Starts a server listening at port 4000 locally or
 * using environment variable POT on Heroku if applicable
 */
const PORT = 4000;
app.use(logErrors);
app.use(dbErrorHandler);
app.use(errorHandler);
app.listen(process.env.PORT || PORT);
