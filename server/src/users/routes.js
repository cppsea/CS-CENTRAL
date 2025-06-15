const { Router } = require("express");
const controller = require("./controller");
const { upload } = require("../images/multer");

const router = Router();
router.post("/", controller.createUser);
router.post("/login", controller.loginUser);
router.put("/", upload.single("avatar"), controller.editUser);

module.exports = router;
