const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 
    'bec6ajxoan6reiui02ca-mysql.services.clever-cloud.com', 
    user: 'u0b12xpumebzixyw',
    password: 'v2oWtDWX28KLkRCKvlvN',
    database: 'bec6ajxoan6reiui02ca',
    multipleStatements: true
});
// Connect
connection.connect((err)=> {
    if(err) throw err 
})

module.exports = connection;