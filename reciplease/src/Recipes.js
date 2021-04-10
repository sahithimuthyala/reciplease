import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

const [rating, set_rating] = useState('');
const [prep_time_minutes, set_prep_time_minutes] = useState('');
const [serving_size, set_serving_size] = useState('');
const [recipe_description, set_recipe_description] = useState('');
const [recipe_name, set_recipe_name] = useState('');

const [recipeList, setRecipesList] = useState([]);

const [new_rating, setNewrating] = useState("");
const [new_prep_time_minutes, setNewprep_time_minutes] = useState("");
const [new_serving_size, setNewserving_size] = useState("");
const [new_recipe_description, setNewrecipe_description] = useState("");
const [new_recipe_name, setNewrecipe_name] = useState("");

const [searchrecipe_name, setSearchrecipe_name] = useState("");

useEffect(() => {
  Axios.get('http://localhost:3002/api/recipes/get').then((response) => {
    setRecipesList(response.data)
  })
})

function Recipes() {
  return (
    <div className="Recipes">
    </div>
  );
}
  
export default Recipes;