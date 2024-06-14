const { Router } = require("express");
const controller = require("./controller");

const router = Router();
router.post("/", controller.createUser);
router.post("/login", controller.loginUser);

module.exports = router;