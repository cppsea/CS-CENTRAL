const { Router } = require("express");
const controller = require("./controller");

const authorizeArticle = require('../middleware/authorizeArticle')
const router = Router();


//require auth for all article routes

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", (req, res) => controller.getArticlesById(req, res));

module.exports = router;
