import {getDb, close} from "../common/db.js";
import sendEmail from "./email.js";
import fetch from 'node-fetch'; 

async function changesOccurred(url, elementToTrack) {
    let targetContent = await fetch(url).then((response) => {return response.text()});
    if (targetContent.match(elementToTrack) === null) { //target element no longer on page in desired form
        return true;
    }
    else {
        return false;
    }
}

function cleanupOnChange() {
    return true;
}

async function checkforChanges() {
    console.log("Checking for website changes...");

    const db = await getDb();
    const collection = db.collection("alerts");
    
    const myCur = await collection.find();
    await myCur.forEach( async (record) => {
        let changes = await changesOccurred(record.url,record.elementToTrack);
        if (changes) {
            console.log(" - Change occurred to: " + record.url);
            sendEmail(record.username,record.subject,record.emailContent,record.email);
            cleanupOnChange();
        } else {
            console.log(" - No Change to: " + record.url);
        }
            
    });
    await close();    
}

checkforChanges();
