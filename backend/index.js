const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = mysql.createConnection({
  host: '35.238.8.125',
  user: 'root',
  password: 'databaes123',
  database: 'db',
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// users endpoints
app.get("/api/users/get", (require, response) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
      response.send(result);
  });
});

app.get("/api/users/getSelected/:first_name", (require, response) => {
  const first_name = require.params.first_name;

  const sqlSelect = "SELECT * FROM users WHERE `first_name`= ?";
  db.query(sqlSelect, first_name, (err, result) => {
      response.send(result);

      if (err) 
        console.log(err);
  });
});

app.post("/api/users/insert", (require, response) => {
  const first_name = require.body.first_name;
  const last_name = require.body.last_name;
  const email = require.body.email;

  const sqlInsert = "INSERT INTO `users` (`first_name`, `last_name`, `email`) VALUES (?,?,?)";
  db.query(sqlInsert, [first_name, last_name, email], (err, result) => {
      if (err)
        console.log(err);
  })
});

app.delete("/api/users/delete/:email", (require, response) => {
  const email = require.params.email;

  const sqlDelete = "DELETE FROM `users` WHERE `email`= ?";
  db.query(sqlDelete, email, (err, result) => {
      if (err) 
        console.log(err);
  })
});

app.put("/api/users/update/", (require, response) => {
  const first_name = require.body.first_name;
  const last_name = require.body.last_name;
  const email = require.body.email;

  const sqlUpdate = "UPDATE `users` SET `first_name` = ?, `last_name` = ? WHERE `email`= ?";
  db.query(sqlUpdate, [first_name, last_name, email], (err, result) => {
      if (err) 
        console.log(err);
  })
});

// recipes endpoints

// ingredients endpoints

// tags endpoints

app.listen(3002, () => {
  console.log("running on port 3002");
})