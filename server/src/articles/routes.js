const { Router } = require("express");
const controller = require("./controller");

const requireAuth = require('../middleware/requireAuth');
const authorizeArticle = require('../middleware/authorizeArticle')
const router = Router();

router.use(requireAuth)

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", (req, res) => controller.getArticlesById(req, res));
router.get("/recommendations", async (req, res) => controller.getRecommendedArticles(req, res));

router.post("/", (req, res) => controller.addArticles(req, res));
router.delete('/:id', requireAuth, authorizeArticle, controller.deleteArticle);

module.exports = router;
