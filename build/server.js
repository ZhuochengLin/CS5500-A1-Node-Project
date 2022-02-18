"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const dotenv_1 = require("dotenv");
const logErrors_1 = __importDefault(require("./error_handlers/logErrors"));
const dbErrorHandler_1 = __importDefault(require("./error_handlers/dbErrorHandler"));
const errorHandler_1 = __importDefault(require("./error_handlers/errorHandler"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
mongoose_1.default.connect(`${process.env.DB_URI}`, (err) => {
    if (err)
        throw err;
    console.log("Mongoose connected!");
});
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const PORT = 4000;
app.use(logErrors_1.default);
app.use(dbErrorHandler_1.default);
app.use(errorHandler_1.default);
app.listen(process.env.PORT || PORT);
