import { MongoClient } from "mongodb";

import {config} from 'dotenv';
config();

const connectionString = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;
console.log(connectionString);

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let dbConnection = undefined;
console.log()

async function connectToServer() {
    console

    await client.connect();
    if (client.err) {
        console.log("The following error occurred upon connection:")
        console.log(client.err);
    }
    else {
        console.log("Successfully connected to Mongo");
        dbConnection = client.db(dbName);
    }
}

export async function getDb() {
    
    if (typeof dbConnection === "undefined")
        await connectToServer(console.log);
    return dbConnection;
}
