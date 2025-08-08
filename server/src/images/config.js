const cloudinary = require('cloudinary').v2;
// export const cloudinary1 = cloudinary
cloudinary.config({
    cloud_name: 'dfqmccik2',
    api_key: '274176942952433',
    api_secret: 'xTN2VnnA_ePTXg9eYlaFu-SNQtw'
});

module.exports = {
    cloudinary1:cloudinary
}


