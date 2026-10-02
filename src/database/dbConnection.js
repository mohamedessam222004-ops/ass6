import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
export let db;

export const dbConnection = async () => {
    try {
        await client.connect();
        db = client.db("assignment7");
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.log("MongoDB connection error ❌", error);
    }
};