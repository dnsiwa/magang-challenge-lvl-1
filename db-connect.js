const mysql = require('mysql');
const dotenv = require('dotenv')

// Load dotenv config
dotenv.config()

const conn = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name
});

conn.connect(function(err) {
    if(err) throw err;
    console.log('MySql Connected...');
});

module.exports=conn;