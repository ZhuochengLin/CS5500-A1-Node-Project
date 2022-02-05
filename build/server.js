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
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/health", (req, res) => res.json("Good"));
if (process.env.NODE_ENV === "local") {
    mongoose_1.default.connect("mongodb://localhost:27017/tuiter");
}
else {
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    mongoose_1.default.connect(`mongodb+srv://${user}:${password}@cluster0.qlxai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
}
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
