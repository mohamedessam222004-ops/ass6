import express from "express";
import { dbConnection } from "./src/database/dbConnection.js";
import collectionRouter from "./src/modules/collection/collection.routes.js";
import bookRouter from "./src/modules/book/book.routes.js";
import logRouter from "./src/modules/log/log.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/collection", collectionRouter);
app.use("/books", bookRouter);
app.use("/logs", logRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

await dbConnection();

app.listen(port, () => console.log(`Server running on port ${port} 🚀`));