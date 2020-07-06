const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true},
    name: { type: String, required: true },
    accessToken: { type: String, required: false },
    gender: { type: String, gender: true },
    password: { type: String, required: true },
    creation_time: { type: Date, default: Date.now() },
    resetToken: { type: String, required: false },
    active: { type: Boolean, required: true, default: 0 },
    resetTokenExpiration: { type: Date, required: false, default: Date.now() + 3600000 }
});
module.exports = mongoose.model('User', userSchema);