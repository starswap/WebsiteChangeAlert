import fetch from 'node-fetch'; 
import express from'express';
import cookies from 'cookie-parser';
import {getDb} from '../common/db.js';

export const app = express();
const PORT = 3000;

//Express Middleware
app.use(cookies()); //parse cookies
app.use(express.json());


app.post('/submit', async (req, res) => {
    let cleanedObject = {
        url: req.body.url,
        email: req.body.email,
        elementToTrack: req.body.tagObjectString,
        emailContent: req.body.emailContents,
        subject: req.body.subjectLine,
        username: req.body.username
    }
    console.log("Request to Notify Received");
    console.log(cleanedObject);

    const db = await getDb();
    
    //db.createCollection("alerts")
    const collection = db.collection("alerts");
    await collection.insertOne(cleanedObject);
    console.log("The DB now looks like: ");
    console.log(collection.find().forEach(console.log));

    res.status(200); //need cookies to be set for it to work.
    return res.send({"success":true});
});

//proxy page; requested via cookies.
app.get('/proxyPage', async (req,res) => {
    if (typeof req.cookies.targetPage !== 'undefined') { //we have a target page
        let proxyURL = req.cookies.targetPage;
        let targetText;

        try {
            targetText = await fetch(proxyURL).then((response) => {return response.text()});
        }
        catch (e) {
            if (e instanceof TypeError) {
                res.status(400); //need cookies to be set for it to work.
                return res.send('Invalid URL; Go Back and Try Again.');            
            } else {
                throw e; 
            }
        }   
        
        return res.send(targetText);
    }
    else {
        res.status(400); //need cookies to be set for it to work.
        return res.send('Set targetDomain and targetPage cookies first.');
    }
})

//Match any otherwise unmatched content by assuming it needs to be proxied
app.get(/(.*)/, async (req,res) => {
    if (typeof req.cookies.targetDomain !== 'undefined') { 
        
        //Fetch the original resource
        let baseURL = req.cookies.targetDomain;
        let assetURL = baseURL+req.params[0];
        let response;
        try {
            response = await fetch(assetURL);
        }
        catch (e) {
            if (e instanceof TypeError) {
                res.status(400); //need cookies to be set for it to work.
                return res.send('Invalid URL.');    
            }
            else {
                throw(e);
            }
        }

        //Get content type and content
        let contentType = response.headers.get("Content-Type"); //ensure the browser interprets the data as the correct content type.
        let responseContent = await response.arrayBuffer(); // get binary data
        
        //Forward on the response with the correct Content-Type header, and body content.
        res.set("Content-Type",contentType);
        return res.send(Buffer.from(responseContent));
    }
    else {
        res.status(400); //need cookies to be set for it to work.
        return res.send('Set targetDomain and targetPage cookies first.');
    }    
})
