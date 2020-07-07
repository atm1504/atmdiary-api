const nodemailer = require('nodemailer');
const fs = require('fs');
const { EMAIL,EMAIL_HOST,EMAIL_PORT,PASSWORD} = require("./../configs/config");
let transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
    auth: { user: EMAIL, pass: PASSWORD }
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
