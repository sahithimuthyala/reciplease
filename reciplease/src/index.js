import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Recipes from './Recipes';

import Users from './Users';

import Ingredients from './Ingredients';

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