import { Router } from "express";
import { insertLog } from "./log.controller.js";

const logRouter = Router();

logRouter.post("/", insertLog);

export default logRouter;