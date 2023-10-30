const express = require('express');
const articleRoutes = require('./src/articles/routes.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/' , (req,res) => {});

//routes to /api/articles will be handled in /src/articles/routes.js
app.use('/api/articles', articleRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));