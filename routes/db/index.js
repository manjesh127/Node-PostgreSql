const {
    Pool,
    Client
} = require('pg')

const pool = new Pool({
    user: 'manjesh',
    host: 'localhost',
    database: 'postgres',
    password: 'manjesh',
    port: 5432,
})

module.exports = {
    pool
}