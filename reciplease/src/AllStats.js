import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function AllStats() {
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
            // response.data[4] is an array with stats on the current user, their friends, and the users who created the current user's favorite recipes
            set_stats_list(response.data[4])
        })
    }, [])

    return (
        <div className="MyRecipeStats">
            <h1> More Recipe Stats</h1>
            <p> The stats provided are either yours, your friends', or those of the users who created your favorite recipes. </p>

            {stats_list.map((val) => {
                return (
                    <div className = "card">
                        <p> Email: {val.email}</p>
                        <p> Number of published recipes: {val.num_recipes}</p>
                        <p> Average rating of published recipes: {val.avg_rating}</p>
                    </div>
                );
            })}

        </div>
    );
}

export default AllStats;