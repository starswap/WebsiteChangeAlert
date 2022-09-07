import nodemailer from 'nodemailer';
import {config} from 'dotenv';
config();


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
  subject: 'New Jane Street Puzzle',
  html: "<body><div style='background-color:blue'>Dear Hamish, A new Jane Street Puzzle is available.</div></body>"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});