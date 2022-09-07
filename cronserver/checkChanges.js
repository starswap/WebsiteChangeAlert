import {getDb, close} from "../server/db.js";
import sendEmail from "./email.js";

function changesOccurred(url, elementToTrack) {
    return true;
}

console.log("Checking for website changes...");

const db = await getDb();
const collection = db.collection("alerts");

const myCur = await collection.find();
await myCur.forEach((record) => {
    if (changesOccurred(record.url,record.elementToTrack))
        sendEmail(record.username,record.subject,record.emailContent,record.email);
});
await close();
