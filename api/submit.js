import {getDb} from '../common/db.js';
import express from 'express';

let app = express();

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

    res.status(200);
    return res.send({"success":true});
});

export default app;