import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import Users from './Users';

ReactDOM.render(
    <App />,
    
    document.getElementById('root')
);

ReactDOM.render(
    <Users />,
    
    document.getElementById('users')
);
