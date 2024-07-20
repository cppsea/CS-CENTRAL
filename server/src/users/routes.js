const { Router } = require("express");
const { validate, validateParams } = require("../middleware/validate");
const { userSchema, userIdSchema, changeUserSchema } = require("./validation");
const controller = require("./controller");
const requireAuth = require('../middleware/requireAuth');

const router = Router(); 

router.post("/", validate(userSchema), controller.createUser);
router.post("/login", validate(userSchema), controller.loginUser);
router.get("/:id", validateParams(userIdSchema), requireAuth, controller.getUsersById);
router.put("/:id", validateParams(userIdSchema), validate(changeUserSchema), requireAuth, controller.changeUser);
router.delete("/:id", validateParams(userIdSchema), requireAuth, controller.deleteAccount);

module.exports = router;
