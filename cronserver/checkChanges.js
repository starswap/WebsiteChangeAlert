import {getDb, close} from "../common/db.js";
import sendEmail from "./email.js";
import fetch from 'node-fetch'; 
import { JSDOM } from 'jsdom';


function stringMatch(string,pattern) {
    for (let i=0;i<string.length;++i) {
        let found = true;
        for (let j=0;j<pattern.length;++j) {
            if (string[i+j] != pattern[j]){
                found = false;
                break;
            }
        }
        if (found == true) {
            return true;
        }
    }
    return false;
} 

async function hasTheWebsiteChanged(url, elementToTrack) {
    let targetContent = await fetch(url).then((response) => {return response.text()});
    
    if (!stringMatch(targetContent,elementToTrack)) { //target element no longer on page in desired form
        return [ true, targetContent ];
    }
    else {
        return [ false, targetContent ];
    }
}

async function updateOneAlert(alert,collection,htmlResponse) {
    // If the website has changed and the alert has fired, we need to stop it from firing again at every subsequent run of this script, because that's annoying for the customer.

    const { document } = (new JSDOM(htmlResponse)).window;
    const correspondingElement = null;
    if (alert.id !== "")
        correspondingElement = document.getElementById(alert.id);
    
    let updateDoc;
    let wasAbleToUpdate;

    if (correspondingElement !== null) { //If there is still an object with the same ID on the page, we can now track that object
        updateDoc = {
            $set: {
                fired: correspondingElement.outerHTML
            },
        };
        wasAbleToUpdate = true;
    }
    else {
        updateDoc = {
            $set: {
              fired: true
            },
        };        
        wasAbleToUpdate = false;
    }

    await collection.updateOne(alert, updateDoc);    
    console.log("Updated alert.");
    return wasAbleToUpdate;
}

async function processOneAlert(alert,collection) {
    //Check for changes
    if (alert.fired === false) { //, but only if this alert hasn't already fired
        const [ has_changed, htmlResponse ] = await hasTheWebsiteChanged(alert.url,alert.elementToTrack);

        if (has_changed) {
            console.log(" - Change occurred to: " + alert.url);
            const wasAbleToUpdate = await updateOneAlert(alert,collection,htmlResponse); // cleanup the alert after change so it won't fire again until another change occurs.
            sendEmail(alert.username,alert.subject,alert.emailContent,alert.email,wasAbleToUpdate);
        } else {
            console.log(" - No Change to: " + alert.url);
        }       
    }
}

async function checkforChanges() {
    //Runs all website change alert triggers and email alerts users if necessary.

    console.log("Checking for website changes...");

    // Get all alerts that the users have setup, from the DB.
    const db = await getDb();
    const collection = await db.collection("alerts");
    const alerts = await collection.find(); 

    //Each alert needs to be processed to check if it has fired, and update the record in the DB if it has.
    let updates = [];
    await alerts.forEach( (alert) => {
            updates.push(processOneAlert(alert,collection));
        }
    );
    
    //Wait for all alerts to be processed
    await Promise.all(updates);

    //Job done!
    console.log("Processed all alerts; closing connection.")
    await close();
}

checkforChanges();
