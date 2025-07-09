require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../../db.js");
const { Router } = require("express");
const controller = require("./controller");

const { getUserByUsername } = require("../users/queries");
const { searchUsers } = require("./queries.js");

const requireAdminAuth = async (req, res, next) => {
  //verify that user is authenticated
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    //decodes jwt token and extracts id from token
    const { id } = jwt.verify(token, process.env.ADMIN_SECRET);
    console.log("decoded token payload: ", id);
    //uses id to find in database
    const userResult = await pool.query(getUserByUsername, [id]);

    if (!userResult || !userResult.rows || userResult.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Admin Request is not authorized" });
  }
};

const router = Router();
router.use(requireAdminAuth);

router.post("/login", controller.loginAdminUser);
router.post("/", controller.giveAdminToUser);
router.delete("/", controller.giveAdminToUser);

router.get("/users", controller.searchUsers);
router.get("/users/:id", controller.getUserData);
router.delete("/users/:id", controller.deleteUser);

router.patch("/articles/:id/publish", controller.publishArticle);
router.patch("/articles/:id/unpublish", controller.unpublishArticle);
router.get("/articles/:id", controller.getArticle);
router.delete("/articles/:id", controller.deleteArticle);

module.exports = router;
