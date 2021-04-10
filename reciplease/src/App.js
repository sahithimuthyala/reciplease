import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CS 411 Project: ReciPlease</h1>
      <h2>Team: Outer Join, but we like to call ourselves databaes</h2>

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
  );
}

export default App;
