import {getDb, close} from "../server/db.js";

console.log("Checking for website changes...");

const db = await getDb();
const collection = db.collection("alerts");
console.log("The DB now looks like: ");
const myCur = await collection.find();
await myCur.forEach(console.log);
await close();

