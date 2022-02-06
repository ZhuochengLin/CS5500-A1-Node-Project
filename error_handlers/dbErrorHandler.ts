import {NextFunction, Request, Response} from "express";

interface DBError extends Error {
    code: number;
    keyValue: object;
    path: string;
    value: string;
}

export default function dbErrorHandler(err: DBError, req: Request, res: Response, next: NextFunction) {
    if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(500).send(`Invalid ${err.path}: ${err.value}`);
    } else if (err.code === 11000) {
        res.status(500).send(`Duplicate ${Object.keys(err.keyValue)[0]}: ${Object.values(err.keyValue)[0]}`);
    } else {
        next(err);
    }
}