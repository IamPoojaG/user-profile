import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Login from './Login';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function RegistrationEdit() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    const getUser = async () => {
      const reqData = await fetch(
        `https://githubuserprofile544.onrender.com/users/${id}`
      );
      const resData = await reqData.json();
      const data = resData.user;
      console.log(data.firstName);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPassword(data.password);
      setImg(data.img);
    };
    getUser();
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !img) {
      setFlag(true);
    } else {
      setFlag(false);
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
      .put(`https://githubuserprofile544.onrender.com/users/${id}`, newUser)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate('/table');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        {' '}
        {login ? (
          <form className='register' onSubmit={handleFormSubmit}>
            <h3>Edit user</h3>
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
                value={firstName}
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
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <div className='form-group '>
              <label>Email</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='form-group '>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='form-group '>
              <label>Image Link</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Image link'
                value={img}
                onChange={(event) => setImg(event.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-dark btn-lg btn-block'>
              Update
            </button>
          </form>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default RegistrationEdit;
