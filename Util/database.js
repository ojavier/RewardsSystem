const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-oscarv7.alwaysdata.net',
    user: 'oscarv7_oscar',
    database: 'oscarv7_rewards',
    password: 'swrdS0ul13.'
});

module.exports = pool.promise();