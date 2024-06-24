const { Router } = require("express");
const controller = require("./controller");
const requireAuth = require('../middleware/requireAuth');

const router = Router();

router.use(requireAuth)

router.delete("/:id", controller.deleteAccount);
router.get("/", controller.getUsers);
//router.get("/:id", controller.getUsersById);
router.put("/:id", controller.changeUser);

module.exports = router;