import './App.css';
import React, {useState, useEffect, useReducer} from "react";
import Axios from 'axios';

function App() {
  return (
    <div className="App">
      <h1>CS 411 Project</h1>
      <h2>Team: Outer Join, but we like to call ourselves databaes</h2>

      <div className="form">
        <h3> Homepage:</h3>
        <button onClick={showUsers()}> Users</button>
        <br/>
        <br/>
        <button> Recipes</button>
        <br/>
        <br/>
        <button> Ingredients</button>
        <br/>
        <br/>
        <button> Tags</button>
        <br/>
        <br/>
        <button> Advanced Queries</button>
      </div>

    </div>
  );
}

export default App;
