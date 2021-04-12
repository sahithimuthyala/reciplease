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
  const sqlSelect = "SELECT * FROM users LIMIT 15";
  db.query(sqlSelect, (err, result) => {
      response.send(result);
  });
});

app.get("/api/users/getSelected/:first_name", (require, response) => {
  const first_name = require.params.first_name;

  const sqlSelect = "SELECT * FROM users WHERE `first_name` LIKE ? LIMIT 15";
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
      response.sendStatus(204)
  })
});

app.delete("/api/users/delete/:email", (require, response) => {
  const email = require.params.email;

  const sqlDelete = "DELETE FROM `users` WHERE `email`= ?";
  db.query(sqlDelete, email, (err, result) => {
      if (err) 
        console.log(err);
      response.sendStatus(204)
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
      response.sendStatus(204)
  })
});

// recipes endpoints
app.get("/api/recipes/get", (require, response) => {
  const sqlSelect = "SELECT * FROM recipes LIMIT 15";
  db.query(sqlSelect, (err, result) => {
      response.send(result);
  });
});

app.get("/api/recipes/getSelected/:recipe_id", (require, response) => {
  const recipe_id = require.params.recipe_id;

  const sqlSelect = "SELECT * FROM recipes WHERE `recipe_id` = ? LIMIT 15";
  db.query(sqlSelect, recipe_id, (err, result) => {
      response.send(result);

      if (err) 
        console.log(err);
  });
});

// might need to add other attributes

app.post("/api/recipes/insert", (require, response) => {
  const rating = require.body.rating;
  const prep_time_minutes = require.body.prep_time_minutes;
  const serving_size = require.body.serving_size;
  const recipe_description = require.body.recipe_description;
  const recipe_name = require.body.recipe_name;

  const sqlInsert = "INSERT INTO `recipes` (`user_id`, `rating`, `prep_time_minutes`, `serving_size`, `recipe_description`, `recipe_name`) VALUES (1000, ?,?,?,?,?)";
  db.query(sqlInsert, [rating, prep_time_minutes, serving_size, recipe_description, recipe_name], (err, result) => {
      if (err)
        console.log(err);
      response.sendStatus(204)
  })
});


// figure out based on what are we going to delete

app.delete("/api/recipes/delete/:recipe_id", (require, response) => {
  const recipe_id = require.params.recipe_id;

  const sqlDelete = "DELETE FROM `recipes` WHERE `recipe_id` = ?";
  db.query(sqlDelete, recipe_id, (err, result) => {
      if (err) 
        console.log(err);
      response.sendStatus(204)
  })
});

app.put("/api/recipes/update", (require, response) => {
  const recipe_id = require.body.recipe_id;
  const rating = require.body.rating;
  const prep_time_minutes = require.body.prep_time_minutes;
  const serving_size = require.body.serving_size;
  const recipe_description = require.body.recipe_description;
  const recipe_name = require.body.recipe_name;

  const sqlUpdate = "UPDATE `recipes` SET `rating` = ?, `prep_time_minutes` = ?, `serving_size` = ?, `recipe_description` = ?, `recipe_name` = ? WHERE `recipe_id`= ?";
  db.query(sqlUpdate, [rating, prep_time_minutes, serving_size, recipe_description, recipe_name, recipe_id], (err, result) => {
      if (err) 
        console.log(err);
      response.sendStatus(204)
  })
});


// ingredients endpoints

app.get("/api/ingredients/get", (require, response) => {
  const sqlSelect = "SELECT ingredient_id, ingredient_description, recipe_name FROM ingredients NATURAL JOIN recipes LIMIT 15";
  db.query(sqlSelect, (err, result) => {
      response.send(result);
  });
});

app.get("/api/ingredients/getSelected/:ingredient_id", (require, response) => {
  const ingredient_id = require.params.ingredient_id;

  const sqlSelect = "SELECT ingredient_id, ingredient_description, recipe_name FROM ingredients NATURAL JOIN recipes WHERE `ingredient_id` = ? LIMIT 15";
  db.query(sqlSelect, ingredient_id, (err, result) => {
      response.send(result);

      if (err) 
        console.log(err);
  });
});

// might need to add other attributes

app.post("/api/ingredients/insert", (require, response) => {
  const recipe_id = require.body.recipe_id;
  const ingredient_description = require.body.ingredient_description;

  const sqlInsert = "INSERT INTO `ingredients` (`recipe_id`, `ingredient_description`) VALUES (?,?)";
  db.query(sqlInsert, [recipe_id, ingredient_description], (err, result) => {
      if (err)
        console.log(err);
      response.sendStatus(204)
  })
});


// figure out based on what are we going to delete

app.delete("/api/ingredients/delete/:ingredient_id", (require, response) => {
  const ingredient_id = require.params.ingredient_id;

  const sqlDelete = "DELETE FROM `ingredients` WHERE `ingredient_id` = ?";
  db.query(sqlDelete, ingredient_id, (err, result) => {
      if (err) 
        console.log(err);
      response.sendStatus(204)
  })
});

app.put("/api/ingredients/update", (require, response) => {
  const ingredient_id = require.body.ingredient_id;
  const ingredient_description = require.body.ingredient_description;

  const sqlUpdate = "UPDATE `ingredients` SET `ingredient_description` = ? WHERE `ingredient_id`= ?";
  db.query(sqlUpdate, [ingredient_description, ingredient_id], (err, result) => {
      if (err) 
        console.log(err);
      response.sendStatus(204)
  })
});

// tags endpoints

app.listen(3002, () => {
  console.log("running on port 3002");
})