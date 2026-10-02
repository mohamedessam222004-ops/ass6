import { Router } from "express";
import {
  insertOneBook,
  insertManyBooks,
  updateFutureBook,
  getBookByTitle,
  getBooksByYearRange,
  getBooksByGenre,
  getBooksSkipLimit,
  getBooksYearInteger,
  getBooksExcludeGenres,
  deleteBooksBeforeYear,
  aggregate1,
  aggregate2,
  aggregate3,
  aggregate4,
} from "./book.controller.js";

const bookRouter = Router();

bookRouter.post("/batch", insertManyBooks);
bookRouter.post("/", insertOneBook);

bookRouter.patch("/Future", updateFutureBook);

bookRouter.get("/title", getBookByTitle);
bookRouter.get("/year", getBooksByYearRange);
bookRouter.get("/genre", getBooksByGenre);
bookRouter.get("/skip-limit", getBooksSkipLimit);
bookRouter.get("/year-integer", getBooksYearInteger);
bookRouter.get("/exclude-genres", getBooksExcludeGenres);
bookRouter.get("/before-year", deleteBooksBeforeYear); // GET used per PDF spec
bookRouter.get("/aggregate1", aggregate1);
bookRouter.get("/aggregate2", aggregate2);
bookRouter.get("/aggregate3", aggregate3);
bookRouter.get("/aggregate4", aggregate4);

export default bookRouter;