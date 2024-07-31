const cloudinary = require('cloudinary').v2;
require("dotenv").config();
// export const cloudinary1 = cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

module.exports = {
    cloudinary1:cloudinary
}


