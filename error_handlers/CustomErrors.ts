import {Error} from "mongoose";

export class NoUserLoggedInError extends Error {

    constructor() {
        super("No user is logged in.");
    }

}

export class DuplicateUserError extends Error {

    constructor(username: string) {
        super(`${username} already exists`);
    }

}
/**
 * Declares a custom error interface.
 */
export interface DBError extends Error {
    code: number;
    keyValue: object;
    path: string;
    value: string;
}