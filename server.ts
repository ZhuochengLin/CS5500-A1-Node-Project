import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import {config} from "dotenv";
import logErrors from "./error_handlers/logErrors";
import dbErrorHandler from "./error_handlers/dbErrorHandler";
import errorHandler from "./error_handlers/errorHandler";

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

const PORT = 4000;
app.use(logErrors);
app.use(dbErrorHandler);
app.use(errorHandler);
app.listen(process.env.PORT || PORT);
