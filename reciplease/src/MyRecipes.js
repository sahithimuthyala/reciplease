import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function MyRecipes() {
    const [recipe_list, set_recipes_list] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3002/api/stats/get').then((response) => {
            // response.data[0] is an array of the current user's recipes => [Recipe1, Recipe2, etc.]
            set_recipes_list(response.data[0])

            if (response.data[0].length === 0) {
                set_recipes_list([{
                    recipe_name: null,
                    prep_time_minutes: 0,
                    serving_size: 0,
                    recipe_description: null,
                    rating: 0
                }])
            }
        })
    }, [])

    return (
        <div className="MyRecipes">
            <h1>My Recipes</h1>

            {recipe_list.map((val) => {
                return (
                    <div className = "card">
                        <h1> Recipe Name: {val.recipe_name} </h1>
                        <p> Prep Time Minutes: {val.prep_time_minutes}</p>
                        <p> Serving Size: {val.serving_size}</p>
                        <p> Recipe Description: {val.recipe_description}</p>
                        <p> Rating: {val.rating}</p>
                    </div>
                );
            })}
            
        </div>
    );
}

export default MyRecipes;