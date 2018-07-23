import {Request, Response, Router} from "express";

export class UsersRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routing();
    }

    routing(): void {
        this.router.get("/", function(req: Request, res: Response, next: Function) {
            res.send("respond with a resource");
        });
    }
}
