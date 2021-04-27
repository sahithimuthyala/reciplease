const express = require("express");
const path = require("path");
var app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
// var cookieParser = require('cookie-parser');
var session = require('express-session')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

var db = mysql.createConnection({
  host: '35.238.8.125',
  user: 'root',
  password: 'databaes123',
  database: 'db',
});

var session_middleware = session({secret:'Keep it secret'
,name:'uniqueSessionID'
,saveUninitialized:false})

app.use(session_middleware);

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// var routesArray = ['/api/v1/auth/google/logged_in', '/api/v1/auth/google'];

// app.use(cookieParser());

// auth endpoints
app.get("/api/v1/auth/google", (req, res) => {
  if (req.session.email) {
    res.send(true)
  } else {
    res.send(false)
  }
});

app.post("/api/v1/auth/google", (req, res) => {
  const { token }  = req.body
  client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  }).then((ticket) => {
    const { name, email } = ticket.getPayload();  
    req.session.email = email
    db.query('SELECT * FROM `users` WHERE `email` = \'' + email + '\'', function(err, result) {
      if(err) {
          console.log(err)
      } else {
          if (result && result.length ) {
          } else {
              var firstName = name.substr(0,name.indexOf(' '));
              var lastName = name.substr(name.indexOf(' ')+1);
              const sqlInsert = "INSERT INTO `users` (`first_name`, `last_name`, `email`) VALUES (?,?,?)";
              if (firstName === '') {
                db.query(sqlInsert, [lastName, '', email], (err, result) => {
                    if (err)
                      console.log(err);
                })
              } else {
                db.query(sqlInsert, [firstName, lastName, email], (err, result) => {
                  if (err)
                    console.log(err);
              })
              }
          }
      }
    });
    res.sendStatus(201)
  })
})

app.delete("/api/v1/auth/google", (req, res) => {
  if (req.session.email) {
    delete req.session.email
    res.sendStatus(204);
  } else {
    res.send(true)
  }
})

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

  
  db.query('SELECT `user_id` FROM `users` WHERE `email` = \'' + require.session.email + '\'', (err, result) => {
    if (err)
      console.log(err)
    const user_id = result[0].user_id
    const sqlInsert = "INSERT INTO `recipes` (`user_id`, `rating`, `prep_time_minutes`, `serving_size`, `recipe_description`, `recipe_name`) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [user_id, rating, prep_time_minutes, serving_size, recipe_description, recipe_name], (err, result) => {
        if (err)
          console.log(err);
        response.sendStatus(204)
    })
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
  console.log(require.session)
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
app.get("/api/tags/get", (require, response) => {
  const sqlSelect = "SELECT * FROM tags LIMIT 15";
  db.query(sqlSelect, (err, result) => {
      response.send(result);
  });
});

app.get("/api/tags/getSelected/:tag_id", (require, response) => {
  const tag_id = require.params.tag_id;

  const sqlSelect = "SELECT * FROM tags WHERE `tag_id` = ? LIMIT 15";
  db.query(sqlSelect, tag_id, (err, result) => {
      response.send(result);

      if (err) 
        console.log(err);
  });
});

app.post("/api/tags/insert", (require, response) => {

  const tag_description = require.body.tag_description;


  const sqlInsert = "INSERT INTO `tags` (`recipe_id`, `tag_description`) VALUES (13, ?)";
  db.query(sqlInsert, [tag_description], (err, result) => {
      if (err)
        console.log(err);
  })
});


// figure out based on what are we going to delete

app.delete("/api/tags/delete/:tag_id", (require, response) => {
  const tag_id = require.params.tag_id;

  const sqlDelete = "DELETE FROM `tags` WHERE `tag_id` = ?";
  db.query(sqlDelete, tag_id, (err, result) => {
      if (err) 
        console.log(err);
  })
});

app.put("/api/tags/update", (require, response) => {
  const tag_id = require.body.tag_id;
  const tag_description = require.body.tag_description;


  const sqlUpdate = "UPDATE `tags` SET `tag_description` = ? WHERE `tag_id`= ?";
  db.query(sqlUpdate, [tag_description, tag_id], (err, result) => {
      if (err) 
        console.log(err);
  })
});

// advanced query endpoints

/*
Sahi

SELECT first_name, last_name, COUNT(DISTINCT recipe_id) AS num_recipes, COUNT(DISTINCT user_id2) AS num_friends

FROM users NATURAL JOIN recipes NATURAL JOIN friends_with

GROUP BY first_name, last_name

ORDER BY num_recipes DESC

LIMIT 15;
________________________
Akshit

SELECT tag_description AS name, COUNT(DISTINCT user_id) AS ct

FROM users NATURAL JOIN recipes NATURAL JOIN tags

GROUP BY tag_description

UNION

SELECT first_name AS name, COUNT(DISTINCT tag_id) AS ct

FROM users NATURAL JOIN recipes NATURAL JOIN tags

GROUP BY first_name

ORDER BY ct DESC

LIMIT 15;
________________________
Adarsh

SELECT first_name, last_name, email, AVG(rating) AS avg_ratings, AVG(prep_time_minutes) AS avg_prep 

FROM recipes NATURAL JOIN users 

GROUP BY user_id

ORDER BY last_name

LIMIT 15;
________________________
Noopur

SELECT first_name, last_name, tag_description, rating

FROM users NATURAL JOIN recipes NATURAL JOIN tags

WHERE tag_description LIKE "vegetarian"

GROUP BY tag_description, first_name, last_name, rating

ORDER BY rating DESC

LIMIT 15;
*/

app.get("/api/advancedqueries/sahi/get", (require, response) => {
  const sqlSelect = `SELECT first_name, last_name, COUNT(DISTINCT recipe_id) AS num_recipes, COUNT(DISTINCT user_id2) AS num_friends
                    FROM users NATURAL JOIN recipes NATURAL JOIN friends_with
                    GROUP BY first_name, last_name
                    ORDER BY num_recipes DESC
                    LIMIT 15`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
      response.send(result);
  });
});

app.get("/api/advancedqueries/akshit/get", (require, response) => {
  const sqlSelect = `SELECT tag_description AS name, COUNT(DISTINCT user_id) AS ct
                    FROM users NATURAL JOIN recipes NATURAL JOIN tags
                    GROUP BY tag_description
                    
                    UNION
  
                    SELECT first_name AS name, COUNT(DISTINCT tag_id) AS ct
                    FROM users NATURAL JOIN recipes NATURAL JOIN tags
                    GROUP BY first_name
  
                    ORDER BY ct DESC
                    LIMIT 15`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
      response.send(result);
  });
});

app.get("/api/advancedqueries/adarsh/get", (require, response) => {
  const sqlSelect = `SELECT first_name, last_name, email, AVG(rating) AS avg_ratings, AVG(prep_time_minutes) AS avg_prep 
                    FROM recipes NATURAL JOIN users 
                    GROUP BY user_id
                    ORDER BY last_name
                    LIMIT 15`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
      response.send(result);
  });
});

app.get("/api/advancedqueries/noopur/get", (require, response) => {
  const sqlSelect = `SELECT first_name, last_name, tag_description, rating
                    FROM users NATURAL JOIN recipes NATURAL JOIN tags
                    WHERE tag_description LIKE "vegetarian"
                    GROUP BY tag_description, first_name, last_name, rating
                    ORDER BY rating DESC
                    LIMIT 15`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
      response.send(result);
  });
});

app.listen(3002, () => {
  console.log("running on port 3002");
})