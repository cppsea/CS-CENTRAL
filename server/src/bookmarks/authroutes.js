const { Router } = require("express");
const controller = require("./controller");
const requireAuth = require("../middleware/requireAuth");

const router = Router();

router.use(requireAuth);

router.post("/", controller.addBookmark);
router.get("/", controller.getBookmarks);
router.delete("/:id", controller.deleteBookmark);
router.delete("/", controller.deleteMultipleBookmarks);
//router.put("/", controller.updateBookmarks);

module.exports = router;
