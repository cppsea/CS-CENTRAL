const { Router } = require("express");
const controller = require("./controller");
const requireAuth = require('../middleware/requireAuth');

const router = Router();

router.use(requireAuth)

router.post("/", controller.addBookmarks);
router.get("/", controller.getBookmarks);
router.delete("/:id", controller.deleteBookmarks);
//router.put("/", controller.updateBookmarks);


module.exports = router;