const cloudinary = require('cloudinary').v2;
require("dotenv").config();
// export const cloudinary1 = cloudinary
// transit the data into .env
cloudinary.config({
    cloud_name: pocess.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


process.env.PGUSER, 

module.exports = {
    cloudinary1:cloudinary
}


