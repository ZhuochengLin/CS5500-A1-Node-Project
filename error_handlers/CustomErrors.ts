export class NoSuchUserError extends Error {

    constructor() {
        super("No such user.");
    }

}

export class NoSuchTuitError extends Error {
    constructor() {
        super("No such tuit.");
    }

}

export class NoUserLoggedInError extends Error {

    constructor() {
        super("No user is logged in.");
    }

}

export class DuplicateUserError extends Error {

    constructor() {
        super("User already exists.");
    }

}

export class IncorrectCredentialError extends Error {

    constructor() {
        super("Username and password do not match.");
    }

}

export class EmptyTuitError extends Error {

    constructor() {
        super("Empty tuit content");
    }

}

export interface DBError extends Error {
    code: number;
    keyValue: object;
    path: string;
    value: string;
}