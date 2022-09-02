
import fetch from 'node-fetch'; 
import express from'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import cookies from 'cookie-parser';

const app = express();
const PORT = 3000;

//Express Middleware
app.use(cookies()); //parse cookies
app.use(express.json());
app.use(express.static('../client/build')); //serve statically deployed frontend after React compilation

//Serve static main page
app.get('/home', (req, res) => {
    res.sendFile(path.resolve('../client/build', 'index.html'))
});

app.post('/submit', (req, res) => {
    let url = req.body.url;
    let email = req.body.email;
    let emailContents = req.body.emailContents;
    let tagObjectText = req.body.tagObjectString;
    console.log("Request to Notify Received");
    console.log("URL: " + url)
    console.log("Email: " + email)
    console.log("Email Contents: " + emailContents);
    console.log("Tag Object Text: " + tagObjectText);
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

//Create a server running on HTTPS to avoid any issues with secure cookies.
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, () => {
    console.log('Listening...')
})
  




// app.use((req, res, next) => {  
//     res.append('Access-Control-Allow-Origin', ['https://localhost:3000']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     res.append('Access-Control-Allow-Credentials', 'true');
//     next();
// });
