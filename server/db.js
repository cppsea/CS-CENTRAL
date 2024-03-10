//creates our database object that we will be using, may replace pg.pool with sequelize later on
require("dotenv").config();

const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user: process.env.PGUSER, 
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    }
)

//const client = pool.connect();

module.exports = pool;