//creates our database object that we will be using, may replace pg.pool with sequelize later on
const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user: 'test', 
        host: 'localhost',
        database: 'articles',
        password: 'test',
        port: 5432,
    }
)

//const client = pool.connect();

module.exports = pool;