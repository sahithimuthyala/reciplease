import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function AdvQueries() {
  const [sahiList, setSahiList] = useState([]);
  const [akshitList, setAkshitList] = useState([]);
  const [adarshList, setAdarshList] = useState([]);
  const [noopurList, setNoopurList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/advancedqueries/sahi/get').then((response) => {
      setSahiList(response.data)
    });
    Axios.get('http://localhost:3002/api/advancedqueries/akshit/get').then((response) => {
      setAkshitList(response.data)
    });
    Axios.get('http://localhost:3002/api/advancedqueries/adarsh/get').then((response) => {
      setAdarshList(response.data)
    });
    Axios.get('http://localhost:3002/api/advancedqueries/noopur/get').then((response) => {
      setNoopurList(response.data)
    });
  }, [])

  return (
    <div className="AdvQueries">
      <h1> Advanced Queries</h1>
      <div className="form">
        <h2> Sahi's Query</h2>
        <pre>SELECT first_name, last_name, COUNT(DISTINCT recipe_id) AS num_recipes, COUNT(DISTINCT user_id2) AS num_friends <br></br>
                    FROM users NATURAL JOIN recipes NATURAL JOIN friends_with <br></br>
                    GROUP BY first_name, last_name <br></br>
                    ORDER BY num_recipes DESC <br></br>
                    LIMIT 15</pre>

        {sahiList.map((val) => {
          return (
            <div className = "card">
              <h1> Name: {val.first_name} {val.last_name} </h1>
              <p> Number of recipes: {val.num_recipes}</p>
              <p> Number of friends: {val.num_friends}</p>
            </div>
          );
        })}

        <h2> Akshit's Query</h2>
        <pre>SELECT tag_description AS name, COUNT(DISTINCT user_id) AS ct <br></br>
                    FROM users NATURAL JOIN recipes NATURAL JOIN tags <br></br>
                    GROUP BY tag_description <br></br>
                    <br></br>
                    UNION <br></br>
                    <br></br>
                    SELECT first_name AS name, COUNT(DISTINCT tag_id) AS ct <br></br>
                    FROM users NATURAL JOIN recipes NATURAL JOIN tags <br></br>
                    GROUP BY first_name <br></br>
                    <br></br>
                    ORDER BY ct DESC <br></br>
                    LIMIT 15</pre>
        {akshitList.map((val) => {
          return (
            <div className = "card">
              <h1> Name: {val.name} </h1>
              <p> Count: {val.ct}</p>
            </div>
          );
        })}
        <h2> Adarsh's Query</h2>
        <pre>SELECT first_name, last_name, email, AVG(rating) AS avg_ratings, AVG(prep_time_minutes) AS avg_prep <br></br> 
                    FROM recipes NATURAL JOIN users <br></br>
                    GROUP BY user_id <br></br>
                    ORDER BY last_name <br></br>
                    LIMIT 15</pre>
        {adarshList.map((val) => {
          return (
            <div className = "card">
              <h1> Name: {val.first_name} {val.last_name} </h1>
              <p> Email: {val.email}</p>
              <p> Average rating: {val.avg_ratings}</p>
              <p> Average prep time: {val.avg_prep}</p>
            </div>
          );
        })}
        <h2> Noopur's Query</h2>
        <p>SELECT first_name, last_name, tag_description, rating <br></br>
                    FROM users NATURAL JOIN recipes NATURAL JOIN tags <br></br>
                    WHERE tag_description LIKE "vegetarian" <br></br>
                    GROUP BY tag_description, first_name, last_name, rating <br></br>
                    ORDER BY rating DESC <br></br>
                    LIMIT 15</p>
        {noopurList.map((val) => {
          return (
            <div className = "card">
              <h1> Name: {val.first_name} {val.last_name} </h1>
              <p> Tag description: {val.tag_description}</p>
              <p> Rating: {val.rating}</p>
            </div>
          );
        })}
      
      </div>
      
    </div>
  );
}
  
export default AdvQueries;
