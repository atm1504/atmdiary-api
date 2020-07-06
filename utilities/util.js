const nodemailer = require('nodemailer');
const fs = require('fs');
const config = require("../config.json")
let transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: true,
    auth: { user: config.EMAIL, pass: config.PASSWORD }
});

exports.send_email=(email, body, subject, headers)=> {
    transporter.sendMail({
        to: email,
        from: headers,
        subject: subject,
        html:body
    }).then(result => {
        return true;
    }).catch(err => {
        return false
    });
}
