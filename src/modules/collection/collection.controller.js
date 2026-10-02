import { db } from "../../database/dbConnection.js";

// 1) Explicit collection "books" with validation rule
export const createBooksCollection = async (req, res) => {
    try {
        await db.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1,
                            description: "title must be a non-empty string",
                        },
                    },
                },
            },
        });
        res.status(201).json({ ok: 1 });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 2) Implicit collection "authors" (created automatically on insert)
export const createAuthorsImplicit = async (req, res) => {
    try {
        const result = await db.collection("authors").insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3) Capped collection "logs" (1MB limit)
export const createLogsCapped = async (req, res) => {
    try {
        await db.createCollection("logs", {
            capped: true,
            size: 1048576, // 1MB
        });
        res.status(201).json({ ok: 1 });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4) Index on books.title
export const createBooksIndex = async (req, res) => {
    try {
        const indexName = await db.collection("books").createIndex({ title: 1 });
        res.status(201).json(indexName);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};