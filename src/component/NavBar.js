import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

function NavBar() {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
    navigate('/')
  }

  const dynamicMenu = () => {

    if (state) {//user is already logged in
      return [
        <li key="342" className="nav-item">
          <NavLink className="nav-link " to="/profile">Profile</NavLink>
        </li>,
        // <li key="372" className="nav-item">
        // <NavLink className="nav-link" to="/">Verify</NavLink>
        // </li>
      ]

    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Eshkon</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li key="839" className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Login</NavLink>
              </li> */}
              {dynamicMenu()}
            </ul>
            <form className="d-flex" >

              {state ? <button onClick={(event) => logout(event)} className="btn btn-primary" type="submit">
                <i className="fa-solid fa-right-from-bracket"></i> 
                </button>
                : <>
                  <NavLink to='/' className="btn btn-primary" >
                  </NavLink>
                </>
              }
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar