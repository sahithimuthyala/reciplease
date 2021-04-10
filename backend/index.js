const express = require("express");
const app = express();
const mysql = require("mysql");

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'databaes123',
  database: 'ReciPlease',
});

app.get('/', (require, response) => {
  const sqlInsert = "INSERT INTO '' ('', '') VALUES ('', '')";
  db.query(sqlInsert, (err, result) => {
    response.send("Hello world!!!");
  })
});

app.listen(3002, () => {
  console.log("running on port 3002");
})