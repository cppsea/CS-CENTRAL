const {Router} = require("express")
const controller = require("./controller");
const upload = require("multer")
const router = new Router();

router.get("/" , controller.getImages);
router.get("/:id", controller.getImagesById);
router.post("/" , controller.postImage);
router.delete("/:id", controller.deleteImageById);

module.exports = router;