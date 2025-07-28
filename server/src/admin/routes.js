require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../../db.js");
const { Router } = require("express");
const controller = require("./controller");

const { getUserByUsername } = require("../users/queries");
const queries = require("./queries.js");
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

    //check if user has admin
    const checkAdminResult = await pool.query(queries.getAdminByUserID, [
      req.user.id,
    ]);
    if (checkAdminResult.rowCount === 0) {
      throw Error("Admin role association not found with user.");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Admin Request is not authorized. Try logging in again.",
    });
  }
};

const router = Router();

router.post("/login", controller.loginAdminUser);
router.get("/", requireAdminAuth, controller.getAdmins);
router.post("/", requireAdminAuth, controller.giveAdminToUser);
router.delete("/", requireAdminAuth, controller.removeAdminFromUser);

router.post("/users", requireAdminAuth, controller.searchUsers);
router.get("/users/:id", requireAdminAuth, controller.getUserData);
router.delete("/users/:id", requireAdminAuth, controller.deleteUser);

router.patch(
  "/articles/:id/publish",
  requireAdminAuth,
  controller.publishArticle
);
router.patch(
  "/articles/:id/unpublish",
  requireAdminAuth,
  controller.unpublishArticle
);
router.get("/articles/:id", requireAdminAuth, controller.getArticle);
router.delete("/articles/:id", requireAdminAuth, controller.deleteArticle);
router.post("/articles", requireAdminAuth, controller.searchArticles);

router.get(
  "/users/:id/comments",
  requireAdminAuth,
  controller.getCommentsByUser
);
router.delete(
  "/users/comments/:id",
  requireAdminAuth,
  controller.deleteComment
);

module.exports = router;
