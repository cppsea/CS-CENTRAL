//creates our database object that we will be using, may replace pg.pool with sequelize later on
require("dotenv").config();

const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user: '*',
        host: '*',
        database: '*',
        password: '*',
        port: 1,
    }
)



//const client = pool.connect();

module.exports = pool;