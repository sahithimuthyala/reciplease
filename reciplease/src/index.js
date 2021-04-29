import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Recipes from './Recipes';

import Users from './Users';
import AdvQueries from './AdvQueries';

import Ingredients from './Ingredients';
import Tags from './Tags';

import MyRecipes from './MyRecipes';
import MyFavoriteRecipes from './MyFavoriteRecipes';
import MyFriendsRecipes from './MyFriendsRecipes';
import MyRecipeStats from './MyRecipeStats';
import AllStats from './AllStats';

import Axios from 'axios';

// https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670

import GoogleLogin from 'react-google-login';

import env from "react-dotenv";

Axios.get('http://localhost:3002/api/v1/auth/google', { withCredentials: true }).then((response) => {
    if (response.data) {
        ReactDOM.render(
            <App />,
            
            document.getElementById('root')
        );
        
        ReactDOM.render(
            <Users />,
            
            document.getElementById('users')
        );
        
        ReactDOM.render(
            <Recipes />,
            
            document.getElementById('recipes')
        );
        
        ReactDOM.render(
            <Ingredients />,
            
            document.getElementById('ingredients')
        );
        
        ReactDOM.render(
            <AdvQueries />,
            
            document.getElementById('advanced_queries')
        );
        ReactDOM.render(
            <Tags />,
            
            document.getElementById('tags')
        );
        ReactDOM.render(
            <MyRecipes />,
            
            document.getElementById('my_recipes')
        );
        ReactDOM.render(
            <MyFavoriteRecipes />,
            
            document.getElementById('my_favorite_recipes')
        );
        ReactDOM.render(
            <MyFriendsRecipes />,
            
            document.getElementById('my_friends_recipes')
        );
        ReactDOM.render(
            <MyRecipeStats />,
            
            document.getElementById('my_recipe_stats')
        );
        ReactDOM.render(
            <AllStats />,
            
            document.getElementById('all_stats')
        );
    } else {
        const handleLogin = async (googleData) => {
            console.log('google data', googleData)
            await fetch("http://localhost:3002/api/v1/auth/google", {
                method: "POST",
                body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
            })
            window.location.reload(true);
        }
        ReactDOM.render(
            <GoogleLogin
                clientId={env.CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />,
            document.getElementById('login')
          );
    }
})