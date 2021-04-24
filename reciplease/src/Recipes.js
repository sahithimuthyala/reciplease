import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function Recipes() {
  const [rating, set_rating] = useState('');
  const [prep_time_minutes, set_prep_time_minutes] = useState('');
  const [serving_size, set_serving_size] = useState('');
  const [recipe_description, set_recipe_description] = useState('');
  const [recipe_name, set_recipe_name] = useState('');

  const [recipe_list, set_recipes_list] = useState([]);

  const [new_rating, set_new_rating] = useState("");
  const [new_prep_time_minutes, set_new_prep_time_minutes] = useState("");
  const [new_serving_size, set_new_serving_size] = useState("");
  const [new_recipe_description, set_new_recipe_description] = useState("");
  const [new_recipe_name, set_new_recipe_name] = useState("");

  const [search_recipe_id, set_search_recipe_id] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/recipes/get').then((response) => {
      set_recipes_list(response.data)
    })
  }, [])

  const submitRecipe = () => { 
    Axios.post('http://localhost:3002/api/recipes/insert', {
      rating: rating,
      prep_time_minutes: prep_time_minutes,
      serving_size: serving_size,
      recipe_description: recipe_description,
      recipe_name: recipe_name,
    }).then(() => {
      set_recipes_list([])
      Axios.get('http://localhost:3002/api/recipes/get').then((response) => {
        set_recipes_list(response.data)
      })
    });

    set_rating("")
    set_prep_time_minutes("")
    set_serving_size("")
    set_recipe_description("")
    set_recipe_name("")
  };

  const deleteRecipe = (recipe_id) => {
    Axios.delete(`http://localhost:3002/api/recipes/delete/${recipe_id}`).then(() => {
      set_recipes_list([])
      Axios.get('http://localhost:3002/api/recipes/get').then((response) => {
        set_recipes_list(response.data)
      })
    });
  };

  const updateRecipe = (recipe_id) => {
    console.log(recipe_id)
    console.log(new_recipe_name)
    Axios.put(`http://localhost:3002/api/recipes/update`, {
        recipe_id: recipe_id,
        rating: new_rating,
        prep_time_minutes: new_prep_time_minutes,
        serving_size: new_serving_size,
        recipe_description: new_recipe_description,
        recipe_name: new_recipe_name,
    }).then(() => {
      set_recipes_list([])
      Axios.get('http://localhost:3002/api/recipes/get').then((response) => {
        set_recipes_list(response.data)
      })
    });
    set_new_rating("")
    set_new_prep_time_minutes("")
    set_new_serving_size("")
    set_new_recipe_description("")
    set_new_recipe_name("")
  };

  const searchRecipe = () => {
    Axios.get(`http://localhost:3002/api/recipes/getSelected/${search_recipe_id}`).then((response) => {
      set_recipes_list(response.data)
    })
  };

  return (
    <div className="Recipes">
      <h1> Recipes</h1>

      <div className="form">
        <h4> Insert Recipes</h4>
        <label> Recipe Name:</label>
        <input type="text" name="recipe_name" onChange={(e) => {
          set_recipe_name(e.target.value)
        } }/>
        <label> Prep Time Minutes:</label>
        <input type="number" name="prep_time_minutes" onChange={(e) => {
          set_prep_time_minutes(e.target.value)
        } }/>
        <label> Serving Size:</label>
        <input type="number" name="serving_size" onChange={(e) => {
          set_serving_size(e.target.value)
        }}/>
        <label> Recipe Description:</label>
        <input type="text" name="recipe_description" onChange={(e) => {
          set_recipe_description(e.target.value)
        }}/>
        <label> Rating:</label>
        <input type="number" name="rating" onChange={(e) => {
          set_rating(e.target.value)
        }}/>
        
        <button onClick={submitRecipe}> Submit</button>

        <h4> Search recipes</h4>
        <input name="search_recipe_id" onChange={(e) => {
            set_search_recipe_id(e.target.value)
        }}></input>

        <button onClick={() => {
            searchRecipe()
        }}> Populate</button>
        {recipe_list.map((val) => {
          return (
            <div className = "card">
              <h1> Recipe Name: {val.recipe_name} </h1>
              <p> Prep Time Minutes: {val.prep_time_minutes}</p>
              <p> Serving Size: {val.serving_size}</p>
              <p> Recipe Description: {val.recipe_description}</p>
              <p> Rating: {val.rating}</p>
              <button onClick={() => { deleteRecipe(val.recipe_id) }}> Delete</button>
              <input type="text" id="update_recipe_name" onChange={(e) => {
                set_new_recipe_name(e.target.value)
              } }/>
              <input type="number" id="update_prep_time_minutes" onChange={(e) => {
                set_new_prep_time_minutes(e.target.value)
              } }/>
              <input type="number" id="update_serving_size" onChange={(e) => {
                set_new_serving_size(e.target.value)
              } }/>
              <input type="text" id="update_recipe_description" onChange={(e) => {
                set_new_recipe_description(e.target.value)
              } }/>
              <input type="number" id="update_rating" onChange={(e) => {
                set_new_rating(e.target.value)
              } }/>
              <button onClick={() => {
                updateRecipe(val.recipe_id)
              }}> Update</button>
              </div>
          );
        })}
      
      </div>
      
    </div>
  );
}
  
export default Recipes;