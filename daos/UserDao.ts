import UserDaoI from "../interfaces/UserDaoI";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";

export default class UserDao implements UserDaoI {

    private static userDao: UserDao | null = null;

    public static getInstance = () => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    findAllUsers = async() : Promise<User[]> => {
        return UserModel.find({});
    }

    findUserById = async(uid: string): Promise<User | null> =>{
        return UserModel.findById(uid);
    }

    createUser = async(user:User): Promise<User> => {
        return UserModel.create(user);
    }

    updateUser = async(uid: string, user: User): Promise<any> => {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }

    deleteUser = async(uid: string): Promise<any> => {
        return UserModel.deleteOne({_id: uid});
    }
}