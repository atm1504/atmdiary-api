const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateTime = require('node-datetime');

const userSchema = new Schema({
    email: {type: String, required: true},
    name: { type: String, required: true },
    phone: { type: String, required: false },
    accessToken: { type: String, required: false },
    gender: { type: String, gender: true },
    creation_time: { type: String, default: dateTime.create().format('Y-m-d H:M:S') },
    resetToken: { type: String, required: false },
    resetTokenExpiration: { type: Date, required: false }
});
module.exports = mongoose.model('User', userSchema);