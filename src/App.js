import React, {useEffect, createContext, useReducer, useContext, useState} from 'react';
import './App.css';
import NavBar from './component/NavBar';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes , Route, useNavigate} from 'react-router-dom';
import Profile from './screens/Profile';
import { initialUserState, userReducer } from './reducers/userReducer';
import Verify from './screens/Verify';

export const UserContext = createContext();

function DynamicRoutes(){

  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){//user is already logged in
      const user = JSON.parse(localStorage.getItem('user'));
      const userState = {'token': token, 'user': user};
      const action = {type: 'LOGIN', payload: userState};
      dispatch(action);
      navigate('/profile')
    }else{
      navigate('/verify')

    }
  }, []);

  return (
    <div>
        <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/verify' element={<Verify />}></Route>
        <Route exact path='/profile' element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{state: state, dispatch: dispatch}}>
      <Router>
      <div >
        <NavBar ></NavBar>
        <DynamicRoutes />
      </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
