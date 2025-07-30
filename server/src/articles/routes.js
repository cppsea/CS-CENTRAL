const { Router } = require("express");
const controller = require("./controller");
const { upload } = require("../images/multer");

const authorizeArticle = require("../middleware/authorizeArticle");
const optionalAuth = require("../middleware/optionalAuth");
const requireAuth = require("../middleware/requireAuth");
const router = Router();

//put authorize article AFTER requireauth

//routes that require auth
router.delete("/:id", requireAuth, authorizeArticle, (req, res) =>
  controller.deleteArticle(req, res)
);

router.get("/my-articles", requireAuth, (req, res) =>
  controller.getMyArticles(req, res)
);

router.patch("/:id/publish", requireAuth, authorizeArticle, (req, res) =>
  controller.publishArticle(req, res)
);

router.patch("/:id/unpublish", requireAuth, authorizeArticle, (req, res) =>
  controller.unpublishArticle(req, res)
);

router.post(
  "/",
  requireAuth,
  upload.fields([{ name: "main_image", maxCount: 1 }, { name: "images" }]),
  (req, res) => controller.addArticle(req, res)
);

router.put(
  "/:id",
  requireAuth,
  authorizeArticle,
  upload.fields([{ name: "main_image", maxCount: 1 }, { name: "images" }]),
  (req, res) => controller.editArticle(req, res)
);

router.post("/:id/like", requireAuth, (req, res) =>
  controller.likeArticle(req, res)
);
router.delete("/:id/unlike", requireAuth, (req, res) =>
  controller.unlikeArticle(req, res)
);

router.post("/:id/comments", requireAuth, (req, res) =>
  controller.createComment(req, res)
);
router.delete("/comments/:id", requireAuth, (req, res) =>
  controller.deleteComment(req, res)
);
router.get("/:id/comments", requireAuth, (req, res) =>
  controller.getCommentsByArticle(req, res)
);

//dont req auth
router.get("/", optionalAuth, async (req, res) =>
  controller.getArticles(req, res)
);
router.get("/:id", optionalAuth, (req, res) =>
  controller.getArticlesById(req, res)
);

module.exports = router;
