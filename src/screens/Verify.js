import React, { useState, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/constant';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


function Verify() {

    const navigate = useNavigate();
    const [verifyCode, setVerifyCode] = useState("");

    const { state, dispatch } = useContext(UserContext);

    function alertFunction(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        var alertPlaceholder = document.getElementById('alertMsg')
        alertPlaceholder.append(wrapper)
    }

    const Verifyf = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const reqData = {
            verifyCode: verifyCode,
        }

        axios.post(`${API_BASE_URL}/users`, reqData, config)
            .then((response) => {

                const ver = 1;
                fetch(`${API_BASE_URL}/users/${ver}`)
                    .then((response) => response.json())
                    .then((json) => {
                        localStorage.clear();
                        localStorage.setItem('user', JSON.stringify(json))
                        localStorage.setItem('token', 'sdfghgfds');
                        const token = localStorage.getItem('token');
                        const user = JSON.parse(localStorage.getItem('user'));
                        const userState = { 'token': token, 'user': user };
                        const action = { type: 'VERIFY', payload: userState };
                        dispatch(action);
                        navigate('/profile');
                    });
            })
            .catch((err) => {
                alertFunction('Some error occurred')
                console.log(err)
            });

    }

    return (
        <div className='container mt-4'>
            <form onSubmit={(e) => Verifyf(e)}>
                <div>
                    <label htmlFor='verify' className="form-label" ></label>
                    <input onChange={(e) => setVerifyCode(e.target.value)} type="verify" className="form-control" placeholder="Verification Code" id="verify" required />
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary">Verify</button>
                </div>
            </form>
        </div>
    )
}

export default Verify