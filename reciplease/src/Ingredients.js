import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function Ingredients() {
  const [recipe_id, setrecipe_id] = useState('');
  const [ingredient_description, setingredient_description] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newingredient_description, setNewingredient_description] = useState("");
  const [search_ingredient_id, setsearch_ingredient_id] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/ingredients/get').then((response) => {
      setIngredientsList(response.data)
    })
  }, [])

  const submitIngredient = () => { 
    Axios.post('http://localhost:3002/api/ingredients/insert', {
      recipe_id: recipe_id,
      ingredient_description: ingredient_description,
    }).then(() => {
      setIngredientsList([])
      Axios.get('http://localhost:3002/api/ingredients/get').then((response) => {
        setIngredientsList(response.data)
      })
    });
    setrecipe_id("")
    setingredient_description("")
  };

  const deleteIngredient = (ingredient_id) => {
    Axios.delete(`http://localhost:3002/api/ingredients/delete/${ingredient_id}`).then(() => {
      setIngredientsList([])
      Axios.get('http://localhost:3002/api/ingredients/get').then((response) => {
        setIngredientsList(response.data)
      })
    });
  };

  const updateIngredient = (ingredient_id) => {
    Axios.put(`http://localhost:3002/api/ingredients/update`, {
      ingredient_id: ingredient_id,
      ingredient_description: newingredient_description,
    }).then(() => {
      setIngredientsList([])
      Axios.get('http://localhost:3002/api/ingredients/get').then((response) => {
        setIngredientsList(response.data)
      })
    });
    setNewingredient_description("")
  };

  const searchIngredient = () => {
    Axios.get(`http://localhost:3002/api/ingredients/getSelected/${search_ingredient_id}`).then((response) => {
      setIngredientsList(response.data)
    })
  };

  return (
    <div className="Ingredients">
      <h1> Ingredients</h1>

      <div className="form">
        <label> Recipe ID:</label>
        <input type="text" name="recipe_id" onChange={(e) => {
          setrecipe_id(e.target.value)
        } }/>
        <label> Ingredient Description:</label>
        <input type="text" name="ingredient_description" onChange={(e) => {
          setingredient_description(e.target.value)
        } }/>
        
        <button onClick={submitIngredient}> Submit</button>

        <input name="searchingredient_id" onChange={(e) => {
            setsearch_ingredient_id(e.target.value)
        }}></input>

        <button onClick={() => {
            searchIngredient()
        }}> Populate</button>
        {ingredientsList.map((val) => {
          return (
            <div className = "card">
              <h1> Recipe Name: {val.recipe_name} </h1>
              <p> Ingredient Description: {val.ingredient_description}</p>
              <button onClick={() => { deleteIngredient(val.ingredient_id) }}> Delete</button>
              <input type="text" id="updateingredient_description" onChange={(e) => {
                setNewingredient_description(e.target.value)
              } }/>
              <button onClick={() => {
                updateIngredient(val.ingredient_id)
              }}> Update</button>
              </div>
          );
        })}
      
      </div>
      
    </div>
  );
}
  
export default Ingredients;