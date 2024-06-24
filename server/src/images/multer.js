const multer = require ("multer")
// multer middleware to handle files
const storage = multer.diskStorage({
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
});
// export const upload = multer({storage: storage});

module.exports = {
    upload:multer({storage: storage})
}