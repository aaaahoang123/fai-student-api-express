import {Request, Response, Router} from "express";
import {UserModelBuilder} from "../model-builders";
import {Connection} from "../utilities/connection-helper";

const UserModel = new UserModelBuilder(Connection).model;

export class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routing()
    }

    routing(): void {
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                let meta = UserModel.findAll({attributes: [[Connection.fn('COUNT', Connection.col('user_login')), 'user_login']]});
                let data = UserModel.findAll({limit: 50});
                res.json({
                    meta: await meta,
                    data: await data
                });
            } catch (e) {
                res.send(e);
            }
        });
    }
}
