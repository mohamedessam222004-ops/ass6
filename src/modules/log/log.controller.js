// سؤال 7 — Log APIs

import { db } from "../../database/dbConnection.js";

export const insertLog = async (req, res) => {
    try {
        const result = await db.collection("logs").insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

