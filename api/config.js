var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'nrdmaxi'
});


/*
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'Augurs',
    password : 'Augurs@9848',
    database : 'nrdmaxi'
});

*/
/*
var connection = mysql.createConnection({
    host     : 'nrdmaxi.mysql.dbaas.com.br',
    user     : 'nrdmaxi',
    password : 'RbDyR#nPFkj@2r',
    database : 'nrdmaxi'
  });
 */

connection.connect(function(err) {
    if (err){
        console.log(err);
    }
});
 
module.exports = connection;