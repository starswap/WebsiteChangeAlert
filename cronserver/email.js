import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import fs from 'fs';

const DOMAIN = "https://website-change-alert.vercel.app";

config();

function sendEmailWithContent(subject,htmlContent, target) {
    var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: "Website Change Alert " + process.env.EMAIL_ADDRESS,
        to: target,
        subject: subject,
        html: htmlContent
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


export default function sendEmail(username,subject,content,toAddress,wasAbleToUpdate) {
    fs.readFile('email_template.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        let emailMessageText = data.replaceAll("%DOMAIN%",DOMAIN);
        emailMessageText = emailMessageText.replaceAll("%CONTENT%",content);
        emailMessageText = emailMessageText.replaceAll("%USERNAME%",username);        
        
        if (wasAbleToUpdate) {
          emailMessageText = emailMessageText.replace( /%COULD_UPDATE%(.*)%COULD_UPDATE%/,"$1");
          emailMessageText = emailMessageText.replace( /%COULD_NOT_UPDATE%(.*)%COULD_NOT_UPDATE%/,"");
        }
        else {
          emailMessageText = emailMessageText.replace( /%COULD_NOT_UPDATE%(.*)%COULD_NOT_UPDATE%/,"$1");          
          emailMessageText = emailMessageText.replace( /%COULD_UPDATE%(.*)%COULD_UPDATE%/,"");
        }
        
        sendEmailWithContent('Website Change Alert: '+subject,emailMessageText,toAddress)
    });    
}

