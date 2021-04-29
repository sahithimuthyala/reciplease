import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
Axios.defaults.withCredentials = true

function Tags() {
  const [tag_description, set_tag_description] = useState('');
  const [tag_list, set_tag_list] = useState([]);
  const [new_tag_description, set_new_tag_description] = useState("");
  const [search_tag_id, set_search_tagid] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/tags/get').then((response) => {
      set_tag_list(response.data)
    })
  }, [])

  const submitTag = () => { 
    Axios.post('http://localhost:3002/api/tags/insert', {
      tag_description: tag_description,
    }).then(() => {
      set_tag_list([])
      Axios.get('http://localhost:3002/api/tags/get').then((response) => {
        set_tag_list(response.data)
      })
    });
    set_tag_description("")
  };

  const deleteTag = (tag_id) => {
    Axios.delete(`http://localhost:3002/api/tags/delete/${tag_id}`).then(() => {
      set_tag_list([])
      Axios.get('http://localhost:3002/api/tags/get').then((response) => {
        set_tag_list(response.data)
      })
    });
  };

  const updateTag = (tag_id) => {
    Axios.put(`http://localhost:3002/api/tags/update`, {
        tag_id: tag_id,
        tag_description: new_tag_description,
    }).then(() => {
      set_tag_list([])
      Axios.get('http://localhost:3002/api/tags/get').then((response) => {
        set_tag_list(response.data)
      })
    });
 
    set_new_tag_description("")
  
  };

  const searchTag = () => {
    Axios.get(`http://localhost:3002/api/tags/getSelected/${search_tag_id}`).then((response) => {
      set_tag_list(response.data)
    })
  };

  return (
    <div className="Tags">
      <h1> Recipes' tags</h1>

      <div className="form">
        <h3> Insert tags</h3>
        <label> Tags Description:</label>
        <input type="text" name="tag_description" onChange={(e) => {
          set_tag_description(e.target.value)
        }}/>
        <button onClick={submitTag}> Submit</button>
        <h4>Search tags</h4>
        <input name="search_tag_id" onChange={(e) => {
            set_search_tagid(e.target.value)
        }}></input>

        <button onClick={() => {
            searchTag()
        }}> Populate</button>
        {tag_list.map((val) => {
          return (
            <div className = "card">
              <p> Tags Description: {val.tag_description}</p>
              <button onClick={() => { deleteTag(val.tag_id) }}> Delete</button>
              <input type="text" id="update_tag_description" onChange={(e) => {
                set_new_tag_description(e.target.value)
              } }/>
           
              <button onClick={() => {
                updateTag(val.tag_id)
              }}> Update</button>
              </div>
          );
        })}
      
      </div>
      
    </div>
  );
}
  
export default Tags;