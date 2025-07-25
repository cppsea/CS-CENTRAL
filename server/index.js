const express = require("express");
const articleRoutes = require("./src/articles/routes.js");
const courseRoutes = require("./src/courses/routes.js");
const userRoutes = require("./src/users/routes.js");
const auth_userRoutes = require("./src/users/authroutes.js");
const bookmarkRoutes = require("./src/bookmarks/authroutes.js");
const adminRoutes = require("./src/admin/routes.js");
const imagesRoutes = require("./src/images/routes.js");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.PGUSER);

const app = express();
// const number = 8080

const port = process.env.PORT;

// const port1= 8080

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {});

//routes to /api/articles will be handled in /src/articles/routes.js

app.use("/api/articles", articleRoutes);

app.use("/api/bookmarks", bookmarkRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/users", userRoutes);
app.use("/api/users", auth_userRoutes);

app.use("/api/images", imagesRoutes); // images routes

app.use("/api/admin", adminRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
