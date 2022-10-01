import {getDb, close} from "../common/db.js";
import sendEmail from "./email.js";
import fetch from 'node-fetch'; 
import puppeteer from "puppeteer";
import {JSDOM} from "jsdom";

//These should really come from common.
const FRAME_WIDTH = 720;
const FRAME_HEIGHT = 450;


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

function getElementFromChildIndex(document,childIndexArray) {
    let htmlElement = document.body;
    for (let index of childIndexArray) {
        console.log(htmlElement);
        for (let child of htmlElement.children) {
            console.log(child.cloneNode().outerHTML);
        }
        if (htmlElement.children.length <= index) {
            return false; //not possible to resolve.
        } else {
            htmlElement = htmlElement.children[index];
        }
    }
    return htmlElement;
}
async function hasTheWebsiteChanged(document, elementToTrack) {
    if (!stringMatch(document.body.outerHTML,elementToTrack)) { //target element no longer on page in desired form
        return true;
    }
    else {
        return false;
    }
}

async function fetchAndBuildDOM(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setViewport({width:FRAME_WIDTH,height:FRAME_HEIGHT});
    await page.goto(url);
    
    try {
      await page.waitForNavigation({timeout: 5000});
    }
    catch (e) {
      if (e instanceof puppeteer.errors.TimeoutError) {}
      else {throw(e);}
    }
  
    const documentHTML = await page.evaluate(() => {
      return document.getElementsByTagName("html")[0].outerHTML;
    });

    await browser.close();

    const options = {};

    const { document } = (new JSDOM(documentHTML, options)).window;
    return document;
}

async function updateOneAlert(alert,collection,document) {
    // If the website has changed and the alert has fired, we need to stop it from firing again at every subsequent run of this script, because that's annoying for the customer.
    let updateDoc = {$set: {}};
    let updateSuccess;

    const correspondingElementViaId = document.getElementById(alert.id);
    const correspondingElementViaPosn = getElementFromChildIndex(document,alert.childIndexArray);

    if (alert.id !== "" && correspondingElementViaId !== null) { // Can update the alert via the ID method.
        updateDoc.$set.elementToTrack = correspondingElementViaId.outerHTML.replace(/ class=""/g, "");
        updateDoc.$set.justTagString = correspondingElementViaId.cloneNode().outerHTML.replace(/ class=""/g, "");
        updateSuccess = true;
    }
    else if (correspondingElementViaPosn !== false && correspondingElementViaPosn.cloneNode().outerHTML === alert.justTagString) { // Can update alert via the position on page method. 
        updateDoc.$set.elementToTrack = correspondingElementViaPosn.outerHTML.replace(/ class=""/g, "");
        updateDoc.$set.justTagString = correspondingElementViaPosn.cloneNode().outerHTML.replace(/ class=""/g, "");
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
    if (alert.fired === false || alert.fired == true && alert.devAlwaysTrigger == true) { //, but only if this alert hasn't already fired
      
        let document = await fetchAndBuildDOM(alert.url);
        const has_changed  = await hasTheWebsiteChanged(document,alert.elementToTrack);

        if (has_changed) {
            console.log(" - Change occurred to: " + alert.url);
            const wasAbleToUpdate = await updateOneAlert(alert,collection,document); // cleanup the alert after change so it won't fire again until another change occurs.
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
