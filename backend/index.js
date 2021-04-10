const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'databaes123',
  database: 'ReciPlease',
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

app.get("/api/users/getSelected/:firstName", (require, response) => {
  const firstName = require.params.firstName;

  const sqlSelect = "SELECT * FROM users WHERE `firstName`= ?";
  db.query(sqlSelect, firstName, (err, result) => {
      response.send(result);

      if (err) 
      console.log(error);
  });
});

app.post("/api/users/insert", (require, response) => {
  const firstName = require.body.firstName;
  const lastName = require.body.lastName;
  const email = require.body.email;

  const sqlInsert = "INSERT INTO `users` (`first_name`, `last_name`, `email`) VALUES (?,?,?)";
  db.query(sqlInsert, [firstName, lastName, email], (err, result) => {
      console.log(error);
  })
});

app.delete("/api/users/delete/:email", (require, response) => {
  const email = require.params.email;

  const sqlDelete = "DELETE FROM `users` WHERE `email`= ?";
  db.query(sqlDelete, email, (err, result) => {
      if (err) 
      console.log(error);
  })
});

app.put("/api/users/update/", (require, response) => {
  const firstName = require.body.firstName;
  const lastName = require.body.lastName;
  const email = require.body.email;

  const sqlUpdate = "UPDATE `users` SET `firstName` = ?, `lastName` = ? WHERE `email`= ?";
  db.query(sqlUpdate, [firstName, lastName, email], (err, result) => {
      if (err) 
      console.log(error);
  })
});

// recipes endpoints

// ingredients endpoints

// tags endpoints

app.listen(3002, () => {
  console.log("running on port 3002");
})