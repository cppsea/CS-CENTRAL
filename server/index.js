const express = require("express");
const auth_articleRoutes = require("./src/articles/authroutes.js");
const articleRoutes = require("./src/articles/routes.js");
const courseRoutes = require("./src/courses/routes.js");
const userRoutes = require("./src/users/routes.js");
const auth_userRoutes = require("./src/users/authroutes.js");
const bookmarkRoutes = require("./src/bookmarks/routes.js");
const auth_bookmarkRoutes = require("./src/bookmarks/authroutes.js")

const cors = require("cors");
require("dotenv").config();
const pool = require('./db');

const app = express();

const port = process.env.PORT;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {});

//routes to /api/articles will be handled in /src/articles/routes.js

app.use("/api/articles", articleRoutes);// must go BEFORE create_delete because create_delete will return authorization error before allowing the api route for GETting articles
app.use("/api/articles", auth_articleRoutes);//the create_delete will have authorization checked, but the regular articleRoutes will not

app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/bookmarks", auth_bookmarkRoutes);

app.use("/api/courses", courseRoutes);

app.use('/api/users', userRoutes);
app.use('/api/users', auth_userRoutes);

// Test the database connection
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Database connected:', result.rows);
    });
  });


app.listen(port, () => console.log(`app listening on port ${port}`));
