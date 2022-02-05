import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import {config} from "dotenv";

config();
const app = express();
app.use(express.json());
app.get("/health", (req: Request, res: Response) => res.json("Good"));

if (process.env.NODE_ENV === "local") {
    mongoose.connect("mongodb://localhost:27017/tuiter");
} else {
    const user: string | undefined = process.env.DB_USER;
    const password: string | undefined = process.env.DB_PASSWORD
    mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.qlxai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
}

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
