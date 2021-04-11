import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Users() {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setEmail] = useState('');
  const [userList, setUsersList] = useState([]);

  const [newfirst_name, setNewfirst_name] = useState("");
  const [newlast_name, setNewlast_name] = useState("");

  const [searchfirst_name, setSearchfirst_name] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/users/get').then((response) => {
      setUsersList(response.data)
    })
  }, [])

  const submitUser = () => { 
    Axios.post('http://localhost:3002/api/users/insert', {
      first_name: first_name,
      last_name: last_name,
      email: email,
    }).then(() => {
      setUsersList([])
      Axios.get('http://localhost:3002/api/users/get').then((response) => {
        setUsersList(response.data)
      })
    });
    setfirst_name("")
    setlast_name("")
    setEmail("")
  };

  const deleteUser = (email) => {
    Axios.delete(`http://localhost:3002/api/users/delete/${email}`).then(() => {
      setUsersList([])
      Axios.get('http://localhost:3002/api/users/get').then((response) => {
        setUsersList(response.data)
      })
    });
  };

  const updateUser = (email) => {
    Axios.put(`http://localhost:3002/api/users/update`, {
      first_name: newfirst_name,
      last_name: newlast_name,
      email: email,
    }).then(() => {
      setUsersList([])
      Axios.get('http://localhost:3002/api/users/get').then((response) => {
        setUsersList(response.data)
      })
    });
    setNewfirst_name("")
    setNewlast_name("")
  };

  const searchUser = () => {
    Axios.get(`http://localhost:3002/api/users/getSelected/${searchfirst_name}`).then((response) => {
      setUsersList(response.data)
    })
  };

  return (
    <div className="Users">
      <h1> Users</h1>

      <div className="form">
        <label> First Name:</label>
        <input type="text" name="first_name" onChange={(e) => {
          setfirst_name(e.target.value)
        } }/>
        <label> Last Name:</label>
        <input type="text" name="last_name" onChange={(e) => {
          setlast_name(e.target.value)
        } }/>
        <label> Email:</label>
        <input type="text" name="email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        
        <button onClick={submitUser}> Submit</button>

        <input name="searchfirst_name" onChange={(e) => {
            setSearchfirst_name(e.target.value)
        }}></input>

        <button onClick={() => {
            searchUser()
        }}> Populate</button>
        {userList.map((val) => {
          return (
            <div className = "card">
              <h1> Name: {val.first_name} {val.last_name} </h1>
              <p> Email: {val.email}</p>
              <button onClick={() => { deleteUser(val.email) }}> Delete</button>
              <input type="text" id="updatefirst_name" onChange={(e) => {
                setNewfirst_name(e.target.value)
              } }/>
              <input type="text" id="updatelast_name" onChange={(e) => {
                setNewlast_name(e.target.value)
              } }/>
              <button onClick={() => {
                updateUser(val.email)
              }}> Update</button>
              </div>
          );
        })}
      
      </div>
      
    </div>
  );
}
  
export default Users;