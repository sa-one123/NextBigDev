import { NextApiRequest,NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {
        const client = await clientPromise;
        const db = client.db('white_board');
        const result = await db.command({ ping: 1 });
        res.status(200).json({
            message:"Pinged your deployment. Successfully connected to MongoDB!",
            result
        })
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(500).json({error:"Unable to connect to MongoDb"});
    }   
}