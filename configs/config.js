require('dotenv').config();

module.exports={
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL:process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    EMAIL_PORT: process.env.EMAIL_PORT
}