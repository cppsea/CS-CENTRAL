const { Router } = require("express");
const controller = require("./controller");

const requireAuth = require('../middleware/requireAuth')
const router = Router();


//require auth for all article routes
router.use(requireAuth)

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", (req, res) => controller.getArticlesById(req, res));

router.post("/", (req, res) => controller.addArticles(req, res));
router.delete('/:id', controller.deleteArticle);

module.exports = router;
