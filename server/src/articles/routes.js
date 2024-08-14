//const authorizeArticle = require('../middleware/authorizeArticle')

const { Router } = require("express");
const controller = require("./controller");
const { validate, validateParams } = require("../middleware/validate");
const { articleSchema, articleIdSchema } = require("./validation");
const optionalAuth = require('../middleware/optionalAuth');
const router = Router();

router.use(optionalAuth); // Optional auth for all article routes

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", validateParams(articleIdSchema), async (req, res) => controller.getArticlesById(req, res));
router.post("/", validate(articleSchema), async (req, res) => controller.addArticles(req, res));
router.delete("/:id", validateParams(articleIdSchema), async (req, res) => controller.deleteArticle(req, res));

module.exports = router;

