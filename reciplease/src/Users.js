import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Users() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userList, setUsersList] = useState([]);

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");

    const [searchFirstName, setSearchFirstName] = useState("");

    useEffect(() => {
      Axios.get('http://localhost:3002/api/users/get').then((response) => {
        setUsersList(response.data)
      })
    })
  
    const submitUser = () => { 
      Axios.post('http://localhost:3002/api/users/insert', {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      
      setUsersList([
        ...userList,
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
        },
      ]);
    };
  
    const deleteUser = (email) => {
      Axios.delete(`http://localhost:3002/api/users/delete/${email}`);
    };
  
    const updateUser = (email) => {
        Axios.put(`http://localhost:3002/api/users/update`, {
          firstName: newFirstName,
          lastName: newLastName,
          email: email,
        });
        setNewFirstName(""),
        setNewLastName("")
    };

    const searchUser = () => {
        Axios.get(`http://localhost:3002/api/users/getSelected/${searchFirstName}`).then((response) => {
        setUsersList(response.data)
      })
    },[];
  
    return (
      <div className="App">
        <h1> Users</h1>
  
        <div className="form">
          <label> First Name:</label>
          <input type="text" name="first_name" onChange={(e) => {
            setFirstName(e.target.value)
          } }/>
          <label> Last Name:</label>
          <input type="text" name="last_name" onChange={(e) => {
            setLastName(e.target.value)
          } }/>
          <label> Email:</label>
          <input name="email" onChange={(e) => {
            setEmail(e.target.value)
          }}/>
          
          <button onClick={submitUser}> Submit</button>
  
          <input name="searchFirstName" onChange={(e) => {
              setSearchFirstName(e.target.value)
          }}></input>

          <button onClick={() => {
              searchUser()
          }}> Populate</button>

          {userList.map((val) => {
            return (
              <div className = "card">
                <h1> Name: {val.firstName} {val.lastName} </h1>
                <p> Email: {val.email}</p>
                <button onClick={() => { deleteUser(val.email) }}> Delete</button>
                <input type="text" id="updateFirstName" onChange={(e) => {
                  setNewFirstName(e.target.value)
                } }/>
                <input type="text" id="updateLastName" onChange={(e) => {
                  setNewLastName(e.target.value)
                } }/>
                <button onClick={() => {
                  updateUser(val.email)
                }}> Update</button>
                </div>
            );
            
            ;
          })}
        
        </div>
        
      </div>
    );
  }
  
  export default App;
  