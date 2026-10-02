import { db } from "../../database/dbConnection.js";

// سؤال 5 — Insert one document
export const insertOneBook = async (req, res) => {
    try {
        const result = await db.collection("books").insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 6 — Insert multiple documents
export const insertManyBooks = async (req, res) => {
    try {
        const result = await db.collection("books").insertMany(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 8 — Update book "Future" year to 2022

export const updateFutureBook = async (req, res) => {
    try {
        const result = await db
            .collection("books")
            .updateOne({ title: "Future" }, { $set: { year: 2022 } });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 9 — Find book by title

export const getBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const book = await db.collection("books").findOne({ title });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 10 — Books between two years
export const getBooksByYearRange = async (req, res) => {
    try {
        const { from, to } = req.query;
        const books = await db
            .collection("books")
            .find({ year: { $gte: Number(from), $lte: Number(to) } })
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 11 — Books that include a genre
export const getBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await db
            .collection("books")
            .find({ genres: genre })
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 12 — Skip, limit, sort
export const getBooksSkipLimit = async (req, res) => {
    try {
        const books = await db
            .collection("books")
            .find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 13 — Year stored as integer
export const getBooksYearInteger = async (req, res) => {
    try {
        const books = await db
            .collection("books")
            .find({ year: { $type: "int" } })
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 14 — Exclude genres Horror & Science Fiction
export const getBooksExcludeGenres = async (req, res) => {
    try {
        const books = await db
            .collection("books")
            .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 15 — Delete books before year
export const deleteBooksBeforeYear = async (req, res) => {
    try {
        const { year } = req.query;
        const result = await db
            .collection("books")
            .deleteMany({ year: { $lt: Number(year) } });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 16 — Aggregate: filter after 2000, sort desc
export const aggregate1 = async (req, res) => {
    try {
        const books = await db
            .collection("books")
            .aggregate([
                { $match: { year: { $gt: 2000 } } },
                { $sort: { year: -1 } },
            ])
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 17 — Aggregate: after 2000, project title/author/year
export const aggregate2 = async (req, res) => {
    try {
        const books = await db
            .collection("books")
            .aggregate([
                { $match: { year: { $gt: 2000 } } },
                { $project: { _id: 0, title: 1, author: 1, year: 1 } },
            ])
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 18 — Aggregate: unwind genres
export const aggregate3 = async (req, res) => {
    try {
        const books = await db
            .collection("books")
            .aggregate([
                { $unwind: "$genres" },
                { $project: { _id: 0, title: 1, genres: 1 } },
            ])
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 19 — Aggregate: join books مع logs
export const aggregate4 = async (req, res) => {
    try {
        const logs = await db
            .collection("logs")
            .aggregate([
                {
                    $lookup: {
                        from: "books",
                        let: { bookIdStr: "$book_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: [{ $toString: "$_id" }, "$$bookIdStr"] },
                                },
                            },
                            { $project: { _id: 0, title: 1, author: 1, year: 1 } },
                        ],
                        as: "book_details",
                    },
                },
                { $project: { _id: 0, action: 1, book_details: 1 } },
            ])
            .toArray();
        res.status(200).json(logs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

