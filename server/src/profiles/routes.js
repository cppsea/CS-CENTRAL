const { Router } = require("express");
const controller = require("./controller");
const { validate, validateParams } = require("../middleware/validate");
const { profileSchema, profileIdSchema } = require("./validation");
const requireAuth = require('../middleware/requireAuth');

const router = Router();

router.use(requireAuth);

router.post("/", validate(profileSchema), controller.createProfile);
router.get("/", controller.getProfile);
router.put("/", validate(profileSchema), controller.updateProfile);

module.exports = router;
