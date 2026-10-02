import { Router } from "express";
import {
    createBooksCollection,
    createAuthorsImplicit,
    createLogsCapped,
    createBooksIndex,
} from "./collection.controller.js";

const collectionRouter = Router();

collectionRouter.post("/books", createBooksCollection);
collectionRouter.post("/authors", createAuthorsImplicit);
collectionRouter.post("/logs/capped", createLogsCapped);
collectionRouter.post("/books/index", createBooksIndex);

export default collectionRouter;