import fetch from 'node-fetch'; 
import express from 'express';
import cookies from 'cookie-parser';

let app = express();
 
//Express Middleware
app.use(cookies()); //parse cookies

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

export default app;