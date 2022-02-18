import TuitControllerI from "../interfaces/TuitControllerI";
import {Express, NextFunction, Request, Response} from "express";
import TuitDao from "../daos/TuitDao";

export default class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/tuits/:tuitid", TuitController.tuitController.findTuitById);
            app.get("/api/users/:userid/tuits", TuitController.tuitController.findTuitsByUser);
            app.post("/api/tuits/", TuitController.tuitController.createTuit);
            app.delete("/api/tuits/:tuitid", TuitController.tuitController.deleteTuit);
            app.put("/api/tuits/:tuitid", TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() {}

    findAllTuits = (req: Request, res: Response): void => {
        TuitController.tuitDao.findAllTuits()
            .then(tuis => res.json(tuis));
    }

    findTuitById = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit))
            .catch(next);
    }

    findTuitsByUser = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits))
            .catch(next);
    }

    createTuit = (req: Request, res: Response): void => {
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    }

    deleteTuit = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status))
            .catch(next);
    }

    updateTuit = (req: Request, res: Response, next: NextFunction): void => {
        TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status))
            .catch(next);
    }
}
