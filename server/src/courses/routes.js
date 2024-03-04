const { Router } = require("express");
const controller = require("./controller");

const router = Router();
router.get("/", controller.getCourses);
router.put("/:id", controller.putCourses);
router.delete("/:id", controller.deleteCourses);
router.post("/", controller.postCourses);

module.exports = router;