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

export interface DBError extends Error {
    code: number;
    keyValue: object;
    path: string;
    value: string;
}