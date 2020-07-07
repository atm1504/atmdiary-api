const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    email: {type: String, required: true},
    name: { type: String, required: true },
    accessToken: { type: String, required: false },
    gender: { type: String, gender: true },
    password: { type: String, required: true },
    creation_time: { type: Date, default: Date.now() },
    resetToken: { type: String, required: false },
    active: { type: Boolean, required: true, default: 0 },
    profile_pic: { type: String, default: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png" },
    resetTokenExpiration: { type: Date, required: false, default: Date.now() + 3600000 }
});
userSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password) //returns boolean
	} catch (error) {
		throw new Error(error);
	}
}
const User = mongoose.model("user", userSchema);
module.exports = { User }