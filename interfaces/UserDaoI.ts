/**
 * @file Declares the UserDao interface.
 */
import {User} from "../models/User";

export interface UserDaoI {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<User | null>;
    findUserByName(uname: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
    deleteUserByName(name: string): Promise<any>;
}
