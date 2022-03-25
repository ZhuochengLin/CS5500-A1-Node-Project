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
import {LogErrors} from "./error_handlers/LogErrors";
import {DbErrorHandler} from "./error_handlers/DbErrorHandler";
import {ErrorHandler} from "./error_handlers/ErrorHandler";
import {TuitController} from "./controllers/TuitController";
import {UserController} from "./controllers/UserController";
import {LikeController} from "./controllers/LikeController";
import {FollowController} from "./controllers/FollowController";
import {BookmarkController} from "./controllers/BookmarkController";
import {MessageController} from "./controllers/MessageController";
import cors from "cors";
import {AuthController} from "./controllers/AuthController";

config();
const session = require("express-session");
const app = express();
app.use(cors({
    credentials: true,
    origin: true
}));
let sess = {
    secret: process.env.SECRET,
    cookie: {
        secure: false
    }
}
if (process.env.ENV === "PRODUCTION") {
    app.set("trust proxy", 1);
    sess.cookie.secure = true;
}
app.use(session(sess));
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
const authController = AuthController.getInstance(app);

/**
 * Starts a server listening at port 4000 locally or
 * using environment variable POT on Heroku if applicable
 */
const PORT = 4000;
app.use(LogErrors);
app.use(DbErrorHandler);
app.use(ErrorHandler);
app.listen(process.env.PORT || PORT);
