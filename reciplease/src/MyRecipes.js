import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function MyRecipes() {
    const [curr_user_email, set_user_email] = useState("");

    const [recipe_list, set_recipes_list] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3002/api/me').then((response) => {
            set_user_email(response.data)
        })
    }, [])

    // output: [UserRecipes, FriendRecipes, FavoriteRecipes, UserRecipeStats, AllRecipeStats]
    // UserRecipes, FriendRecipes, FavoriteRecipes (same as tables in db)
    useEffect(() => {
        Axios.get(`http://localhost:3002/api/stats/get/${curr_user_email}`).then((response) => {
            // response.data[0] is an array of the current user's recipes => [Recipe1, Recipe2, etc.]
            set_recipes_list(response.data[0])
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