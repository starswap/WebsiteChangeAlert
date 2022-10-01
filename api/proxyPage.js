import fetch from 'node-fetch'; 
import cookies from 'cookie-parser';
import express from 'express';

let app = express();
 
console.log("Proxy imported")

//Express Middleware
app.use(cookies()); //parse cookies

//proxy page; requested via cookies.
app.get('/proxyPage', async (req,res) => {
    console.log("You triggered the page proxy!")
    if (typeof req.cookies.targetPage !== 'undefined') { //we have a target page
        let proxyURL = req.cookies.targetPage;
        let targetText;

        try {

            targetText = await fetch(proxyURL,{headers: 
                {
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
                    "Referrer": proxyURL
                }}).then((response) => {return response.text()});
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

export default app;