const Pool = require("pg").Pool;

const pool = new Pool({
    user: "mtmalgdz",
    password: "AgwvZIUdh0I5gYbkvKJB2VRQddoKtghZ",
    host: "tai.db.elephantsql.com",
    port: 5432,
    database: "mtmalgdz"
});

module.exports = pool;