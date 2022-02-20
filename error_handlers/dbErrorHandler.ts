/**
 * @file Defines an error handler that handles only database related errors.
 */
import {NextFunction, Request, Response} from "express";

/**
 * Declares a custom error interface.
 */
interface DBError extends Error {
    code: number;
    keyValue: object;
    path: string;
    value: string;
}

/**
 * Defines an error handler that handles database errors like "ValidationError" and "CastError", and passes
 * the request to the next handling function.
 * @param {DBError} err Database related errors
 * @param {Request} req Represents the request from the client
 * @param {Response} res Represents the response to the client
 * @param {NextFunction} next Next error handling function
 */
export function dbErrorHandler(err: DBError, req: Request, res: Response, next: NextFunction) {
    if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(500).send(`Invalid ${err.path}: ${err.value}`);
    } else if (err.code === 11000) {
        res.status(500).send(`Duplicate ${Object.keys(err.keyValue)[0]}: ${Object.values(err.keyValue)[0]}`);
    } else {
        next(err);
    }
}