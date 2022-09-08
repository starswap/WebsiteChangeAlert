import { MongoClient } from "mongodb";

import {config} from 'dotenv';

config();

const connectionString = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

global.mongoConnection = undefined;

async function connectToServer() {
    await client.connect();
    if (client.err) {
        console.log("The following error occurred upon connection:")
        console.log(client.err);
    }
    else {
        console.log("Successfully connected to Mongo");
        global.mongoConnection = client.db(dbName);
    }
}

export async function getDb() {
    
    if (typeof global.mongoConnection === "undefined") {
        console.log("Connecting again")
        await connectToServer();
    }
        
    return global.mongoConnection;
}

export async function close() {
    await client.close();
}