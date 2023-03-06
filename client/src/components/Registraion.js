import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Login from './Login';
import axios from 'axios';

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || img) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem('Email', JSON.stringify(email));
      localStorage.setItem('Password', JSON.stringify(password));
      setLogin(!login);
    }
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      img,
    };

    axios
      .post('http://localhost:8081/users/add', newUser)
      .then((res) => {
        if (res.data.success) {
          setLogin(!login);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleClick() {
    setLogin(!login);
  }

  return (
    <>
      <div>
        {' '}
        {login ? (
          <form className='rigister' onSubmit={handleFormSubmit}>
            <h3>Register</h3>
            {flag && (
              <Alert color='primary' variant='danger'>
                I got it you are in hurry! But every Field is important!
              </Alert>
            )}

            <div className='form-group'>
              <label>FirstName</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter First Name'
                name='firstName'
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>

            <div className='form-group '>
              <label>LastName</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Last Name'
                name='lastName'
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <div className='form-group '>
              <label>Email</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='form-group '>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='form-group '>
              <label>Image Link</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Image link'
                onChange={(event) => setImg(event.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-dark btn-lg btn-block'>
              Register
            </button>
            <p onClick={handleClick} className='forgot-password text-right'>
              Already registered log in?
            </p>
          </form>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default Registration;
