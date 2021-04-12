import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Recipes from './Recipes';

import Users from './Users';
import AdvQueries from './AdvQueries';

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

ReactDOM.render(
    <AdvQueries />,
    
    document.getElementById('advanced-queries')
);