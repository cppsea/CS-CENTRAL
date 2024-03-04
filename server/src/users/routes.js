const { Router } = require("express");
const controller = require("./controller");

const router = Router();
router.get("/", controller.getUsers);
router.get("/:id", controller.getUsersById);
router.put("/:id", controller.changeUser);
router.post("/", controller.createUser);
router.post("/login", controller.loginUser);
router.delete("/:id", controller.deleteAccount);

module.exports = router;