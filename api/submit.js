import {getDb,close} from '../common/db.js';
import express from 'express';

let app = express();

const db = await getDb();

app.use(express.json());
app.post('/submit', async (req, res) => {
    let cleanedObject = {
        url: req.body.url,
        email: req.body.email,
        elementToTrack: req.body.tagObjectString,
        emailContent: req.body.emailContents,
        subject: req.body.subjectLine,
        username: req.body.username,
        fired: false
    }
    console.log("Request to Notify Received");
    console.log(cleanedObject);
    
    //db.createCollection("alerts")
    const collection = db.collection("alerts");
    await collection.insertOne(cleanedObject);
    console.log("The DB now looks like: ");
    let content = await collection.find().forEach(console.log);

    console.log(content);

    res.status(200);
    
    close();
    return res.send({"success":true});
});

export default app;