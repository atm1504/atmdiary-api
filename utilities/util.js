const nodemailer = require('nodemailer');
const fs = require('fs');
const { EMAIL,EMAIL_HOST,EMAIL_PORT,PASSWORD} = require("./../configs/config");
const { header } = require('express-validator');
let transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
    auth: { user: EMAIL, pass: PASSWORD }
});

exports.send_email = (email, body, subject) => {
    let header = { 'from': "noreply@atmdiary.com", "reply-to": "contact@atmdiary.com", "owner":"atm1504"};
    transporter.sendMail({
        to: email,
        from: "noreply@atmdiary.com",
        subject: subject,
        headers:header,
        html:body
    }).then(result => {
        return true;
    }).catch(err => {
        return false
    });
}
