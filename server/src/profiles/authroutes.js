const { Router } = require("express");
const controller = require("./controller");
const requireAuth = require('../middleware/requireAuth');

const router = Router();

router.use(requireAuth);

router.post("/", controller.createProfile);
router.get("/", controller.getProfile);
router.put("/", controller.updateProfile);

module.exports = router;
