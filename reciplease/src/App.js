import Axios from 'axios';

import './App.css';
Axios.defaults.withCredentials = true

function App() {
  function logout() {
    Axios.delete(`http://localhost:3002/api/v1/auth/google`).then(() => {
      window.location.reload(true);
    })
  }
  return (
    <div className="App">
      {/* <h1>CS 411 Project: ReciPlease</h1>
      <h2>All the recipes to please you!</h2>
      <h4>Team: Outer Join, but we like to call ourselves databaes</h4> */}
      {/* <div style={{
          backgroundImage: `url(https://foodsguy.com/wp-content/uploads/2019/08/Best-Cutting-Board-for-Vegetables.jpg)`
      }}></div> */}
      <button type="button" class="btn btn-default btn-sm" onClick={logout}>
          <span class="glyphicon glyphicon-log-out"></span> Log out
        </button>
      <div class="demo-wrap">
      <img
          class="demo-bg"
          src="https://foodsguy.com/wp-content/uploads/2019/08/Best-Cutting-Board-for-Vegetables.jpg"
          alt=""
        ></img>
        <div class="demo-content">
          <h1>CS 411 Project: ReciPlease</h1>
          <h2>All the recipes to please you!</h2>
          <h4>Team: Outer Join, but we like to call ourselves databaes</h4>
          <div className="form">
        <h3> Homepage:</h3>
        <button id="users_btn" onClick={() => {
          document.getElementById('users').style.display = 'block';
          document.getElementById('ingredients').style.display = 'none';
          document.getElementById('recipes').style.display = 'none';
          document.getElementById('tags').style.display = 'none';
          document.getElementById('advanced_queries').style.display = 'none';
        }}> Users</button>
        <br/>
        <br/>
        <button id="recipes_btn" onClick={() => {
          document.getElementById('users').style.display = 'none';
          document.getElementById('ingredients').style.display = 'none';
          document.getElementById('recipes').style.display = 'block';
          document.getElementById('tags').style.display = 'none';
          document.getElementById('advanced_queries').style.display = 'none';
        }}> Recipes</button>
        <br/>
        <br/>
        <button id="ingredients_btn" onClick={() => {
          document.getElementById('users').style.display = 'none';
          document.getElementById('ingredients').style.display = 'block';
          document.getElementById('recipes').style.display = 'none';
          document.getElementById('tags').style.display = 'none';
          document.getElementById('advanced_queries').style.display = 'none';
        }}> Ingredients</button>
        <br/>
        <br/>
        <button id="tags_btn" onClick={() => {
          document.getElementById('users').style.display = 'none';
          document.getElementById('ingredients').style.display = 'none';
          document.getElementById('recipes').style.display = 'none';
          document.getElementById('tags').style.display = 'block';
          document.getElementById('advanced_queries').style.display = 'none';
        }}> Tags</button>
        <br/>
        <br/>
        <button id="advanced_queries_btn" onClick={() => {
          document.getElementById('users').style.display = 'none';
          document.getElementById('ingredients').style.display = 'none';
          document.getElementById('recipes').style.display = 'none';
          document.getElementById('tags').style.display = 'none';
          document.getElementById('advanced_queries').style.display = 'block';
        }}> Advanced Queries</button>
      </div>
        </div>
        
      </div>
       
   
      
     

    </div>
  );
}

export default App;
