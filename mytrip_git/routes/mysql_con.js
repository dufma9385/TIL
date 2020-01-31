const mysql=require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port:"3307",
    database:"mytrip"
  });

module.exports=con;