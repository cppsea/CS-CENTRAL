const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", (req, res) => controller.getArticlesById(req, res));

router.post("/", (req, res) => controller.addArticles(req, res));
router.delete('/:id', controller.deleteArticle);

module.exports = router;
