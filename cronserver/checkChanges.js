import {getDb, close} from "../common/db.js";
import sendEmail from "./email.js";
import jailed from "jailed";


var path = "./sandboxedDOM.js";
var sandbox = new jailed.sandbox(path);

sandbox.whenConnected(checkforChanges);



async function updateOneAlert(alert,collection,document) {
    // If the website has changed and the alert has fired, we need to stop it from firing again at every subsequent run of this script, because that's annoying for the customer.
    let updateDoc = {$set: {}};
    let updateSuccess;

    const correspondingElementViaId = sandbox.remote.getElementOuterHTMLById(alert.id);
    const correspondingElementViaIdJustTag = sandbox.remote.getElementTagTextById(alert.id);
    const correspondingElementViaPosn = sandbox.remote.getElementOuterHTMLFromChildIndex(document,alert.childIndexArray);
    const correspondingElementViaPosnJustTag = sandbox.remote.getElementTagTextFromChildIndex(document,alert.childIndexArray);


    if (alert.id !== "" && correspondingElementViaId !== null) { // Can update the alert via the ID method.
        updateDoc.$set.elementToTrack = correspondingElementViaId.replace(/ class=""/g, "");
        updateDoc.$set.justTagString = correspondingElementViaIdJustTag.replace(/ class=""/g, "");
        updateSuccess = true;
    }
    else if (correspondingElementViaPosn !== false && correspondingElementViaPosn === alert.justTagString) { // Can update alert via the position on page method. 
        updateDoc.$set.elementToTrack = correspondingElementViaPosn.replace(/ class=""/g, "");
        updateDoc.$set.justTagString = correspondingElementViaPosnJustTag.replace(/ class=""/g, "");
        updateSuccess = true;
    }
    else {
        updateDoc.$set.fired = true;  
        updateSuccess = false;
    }

    await collection.updateOne(alert, updateDoc);
    console.log("Updated alert.");
    return updateSuccess;
}

async function processOneAlert(alert,collection) {
    //Check for changes
    if (alert.fired === false) { //, but only if this alert hasn't already fired
        await sandbox.remote.fetchAndBuildDOM(alert.url); //Prepare the document inside the sandbox
        const has_changed  = await sandbox.remote.hasTheWebsiteChanged(alert.elementToTrack.toString());

        if (has_changed) {
            console.log(" - Change occurred to: " + alert.url);
            const wasAbleToUpdate = await updateOneAlert(alert,collection); // cleanup the alert after change so it won't fire again until another change occurs.
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
