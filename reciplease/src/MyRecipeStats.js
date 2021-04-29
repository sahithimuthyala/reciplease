import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function MyRecipeStats() {
    const [stats_list, set_stats_list] = useState([]);

    // output: [UserRecipes, FriendRecipes, FavoriteRecipes, UserRecipeStats, AllRecipeStats]
    useEffect(() => {
        Axios.get('http://localhost:3002/api/stats/get').then((response) => {
            // response.data[3] is an array with a single entry => {email, num_recipes, avg_rating}
            set_stats_list(response.data[3])

            if (response.data[3].length === 0) {
                set_stats_list([{
                    num_recipes: 0,
                    avg_rating: 0
                }])
            }
        })
    }, [])

    return (
        <div className="MyRecipeStats">
            <h1> My Published Recipe Stats</h1>

            <p> Number of recipes I've published: {stats_list.num_recipes}</p>
            <p> Average rating of my published recipes: {stats_list.avg_rating}</p>

        </div>
    );
}

export default MyRecipeStats;