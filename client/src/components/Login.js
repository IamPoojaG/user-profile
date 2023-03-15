import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [emailLog, setEmailLog] = useState(' ');
  const [passwordLog, setPasswordLog] = useState(' ');

  const [flag, setFlag] = useState(false);

  const [home, setHome] = useState(true);
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    let pass = localStorage.getItem('Password').replace(/"/g, '');
    let mail = localStorage.getItem('Email').replace(/"/g, '');

    if (!emailLog || !passwordLog) {
      setFlag(true);
    } else if (passwordLog !== pass || emailLog !== mail) {
      setFlag(true);
    } else {
      setHome(!home);
      setFlag(false);
    }
  }
  function handleClick() {
    navigate('/table');
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        {flag && (
          <Alert color='primary' variant='warning'>
            Fill correct Info else keep trying.
          </Alert>
        )}
        <h3>LogIn</h3>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter email'
            onChange={(event) => setEmailLog(event.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            onChange={(event) => setPasswordLog(event.target.value)}
          />
        </div>

        <button
          type='submit'
          className='btn btn-dark btn-lg btn-block'
          onClick={handleClick}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
