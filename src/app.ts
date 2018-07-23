import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import {Request , Response} from "express";
import {IndexRouter} from "./routes";
import {UsersRouter} from "./routes/users";

const cookieParser = require("cookie-parser");
const createError = require("http-errors");

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routing();
        this.errorHandle();
    }

    middleware(): void {
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    routing(): void {
        this.app.use("/", new IndexRouter().router);
        this.app.use("/users", new UsersRouter().router);
    }

    errorHandle(): void {
        // catch 404 and forward to error handler
        this.app.use(function(req: Request, res: Response, next) {
            next(createError(404));
        });

        this.app.use(function(err: any, req: Request, res: Response) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
    }
}

export = new App().app;