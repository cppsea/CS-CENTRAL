const { Router } = require("express");
const controller = require("./controller");
const { validate, validateParams } = require("../middleware/validate");
const { addBookmarkSchema, deleteBookmarkSchema } = require("./validation");
const requireAuth = require('../middleware/requireAuth');

const router = Router();

router.use(requireAuth); // Require auth for all bookmark routes

router.get("/", controller.getBookmarks);
router.post("/", validate(addBookmarkSchema), controller.addBookmarks);
router.delete("/:id", validateParams(deleteBookmarkSchema), controller.deleteBookmarks);

module.exports = router;
