const { Router } = require("express");
const controller = require("./controller");

const requireAuth = require('../middleware/requireAuth');
const authorizeArticle = require('../middleware/authorizeArticle')
const router = Router();
const { check, validationResult} = require('express-validator');


//require auth for all article routes
//router.use(requireAuth)

router.get("/", async (req, res) => controller.getArticles(req, res));
router.get("/:id", (req, res) => controller.getArticlesById(req, res));

router.post("/", /**[
    check('title').notEmpty().escape(),
    check['headers'].notEmpty().escape()
    ]*/ (req, res) => {
    const result = validationResult(req);
    //if(result.isEmpty()){
    controller.addArticles(req, res)
    //}
    //else{
    //    res.send({errors: result.array()});
    //}
});
router.delete('/:id', (req, res) => controller.deleteArticle);

module.exports = router;
