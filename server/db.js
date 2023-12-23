//creates our database object that we will be using, may replace pg.pool with sequelize later on
const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user: 'postgres', 
        host: 'localhost',
        database: 'articles',
        password: 'Anhbankarikk10!',
        port: 5432,
    }
)

//const client = pool.connect();

module.exports = pool;