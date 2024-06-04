const { Router } = require("express");
const controller = require("./controller");

const requireAuth = require('../middleware/requireAuth');
const router = Router();


//require auth for all article routes
router.use(requireAuth)

router.post("/", (req, res) => controller.addArticles(req, res));
router.delete('/:id', (req,res) => controller.deleteArticle(req,res));

module.exports = router;
