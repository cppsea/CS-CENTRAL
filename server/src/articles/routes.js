const { Router } = require("express");
const controller = require("./controller");
const { upload } = require("../images/multer");

const authorizeArticle = require("../middleware/authorizeArticle");
const optionalAuth = require("../middleware/optionalAuth");
const router = Router();

//require auth for all article routes
router.use(optionalAuth);

router.get("/my-articles", (req, res) => controller.getMyArticles(req, res));

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", (req, res) => controller.getArticlesById(req, res));

router.post(
  "/",
  upload.fields([{ name: "main_image", maxCount: 1 }, { name: "images" }]),
  (req, res) => controller.addArticle(req, res)
);
router.put(
  "/:id",
  upload.fields([{ name: "main_image", maxCount: 1 }, { name: "images" }]),
  (req, res) => controller.editArticle(req, res)
);
router.patch("/:id/publish", (req, res) => controller.publishArticle(req, res));
router.patch("/:id/unpublish", (req, res) =>
  controller.unpublishArticle(req, res)
);
router.delete("/:id", authorizeArticle, controller.deleteArticle);

module.exports = router;
