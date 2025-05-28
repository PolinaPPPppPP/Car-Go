const Pool = require ('pg').Pool
const pool = new Pool(options ,{
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: node_dorogokrasivo

})

module.exports = pool()