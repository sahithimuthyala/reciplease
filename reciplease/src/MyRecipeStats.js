import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function MyRecipeStats() {
    const [curr_user_email, set_user_email] = useState("");

    const [stats_list, set_stats_list] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3002/api/me').then((response) => {
            set_user_email(response.data)
        })
    }, [])

    // output: [UserRecipes, FriendRecipes, FavoriteRecipes, UserRecipeStats, AllRecipeStats]
    useEffect(() => {
        Axios.get(`http://localhost:3002/api/stats/get/${curr_user_email}`).then((response) => {
            // response.data[3] is an array with a single entry => {email, num_recipes, avg_rating}
            set_stats_list(response.data[3])
        })
    }, [])

    return (
        <div className="MyRecipeStats">
            <h1> My Published Recipe Stats</h1>

            <p> My email: {stats_list[0].email}</p>
            <p> Number of recipes I've published: {stats_list[0].num_recipes}</p>
            <p> Average rating of my published recipes: {stats_list[0].avg_rating}</p>

        </div>
    );
}

export default MyRecipeStats;