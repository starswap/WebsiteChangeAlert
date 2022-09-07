import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import fs from 'fs';

config();

function sendEmailWithContent(subject,htmlContent) {
    var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: 'hamishstarling@gmail.com',
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


export function sendEmail() {
    fs.readFile('email_template.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        sendEmailWithContent('Website Change Alert: New Jane Street Puzzle',data)
    });    
}

sendEmail();
