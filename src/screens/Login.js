import React, {useState, useContext} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/constant';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../App';

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {state, dispatch} = useContext(UserContext);

  function alertFunction(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    var alertPlaceholder = document.getElementById('alertMsg')
    alertPlaceholder.append(wrapper)
  }

  const login = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const reqData = {
      username: username,
      password: password
    }

    axios.post(`${API_BASE_URL}/users`, reqData, config)
      .then((response) => {
        //Assume user has successfully authenticated
        //Fetch the etails of authenticated user, In our case assume userId=1
        const userId = 1;
        fetch(`${API_BASE_URL}/users/${userId}`)
          .then((response) => response.json())
          .then((json) => {
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(json))
            localStorage.setItem('token', 'sdfghgfds');
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const userState = { 'token': token, 'user': user };
            const action = { type: 'LOGIN', payload: userState };
            dispatch(action);
            navigate('/Verify');
          });
      })
      .catch((err) => {
        alertFunction('Some error occurred')
        console.log(err)
      });

  }


  return (
    <div className='container'>
      <h3 className='text-center mt-4'>Please Login Below</h3>
      <div className='mx-auto container'>
        <form onSubmit={(e) => login(e)}>
          <div>
            <label htmlFor='username' className="form-label"></label>
            <input onChange={(e) => setUserName(e.target.value)} type="username" className="form-control" placeholder="Enter Username" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor='password' className="form-label"></label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password" id="password" required />
          </div>
          <div className='d-grid'>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login