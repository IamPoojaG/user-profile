import React, { useState, useEffect } from 'react';
import Post from './Post';
import Pagination from './Pagination';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './table.css';
function Table() {
  const [user, setUser] = useState([]);
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const [order, setOrder] = useState('ASC');
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('https://localhost:8081/users')
  //     .then((res) => setUser(res.data.users))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const getUserdata = async () => {
      const reqData = await fetch(
        'https://githubuserprofile544.onrender.com/users'
      );
      const resData = await reqData.json();
      setUser(resData.users);
      console.log(resData);
    };
    getUserdata();
  }, []);
  // get the current users
  const indexOfLastPost = currentPage * postPerPage;
  // console.log(indexOfLastPost)
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  // console.log(indexOfFirstPost)
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
  let totalPosts = user.length;
  // console.log(currentPosts)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteUser = (id) => {
    setUser(user.filter((user) => user._id !== id));
    axios
      .delete(`https://githubuserprofile544.onrender.com/users/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const searching = () => {
    const searchedData = user.filter((value) => {
      if (
        value.firstName.toLowerCase().includes(search.toLowerCase()) ||
        value.lastName.toLowerCase().includes(search.toLowerCase())
      )
        return value;
    });
    setUser(searchedData);
  };
  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder('ASC');
    }
  };
  return (
    <>
      <nav class='navbar bg-body-tertiary'>
        <div class='container-fluid'>
          <a class='navbar-brand'>Users</a>
          <form class='d-flex' role='search'>
            <button
              onClick={() => {
                navigate(`/`);
              }}
              class='btn btn-outline-success'
              type='submit'
            >
              Logout
            </button>
          </form>
        </div>
      </nav>

      <div className='table_container'>
        <div className='heading'>
          <form
            className='d-flex input-group '
            onSubmit={(e) => e.preventDefault()}
          >
            <div className='input-group mb-3'>
              <input
                className='form-control'
                type='text'
                placeholder='Search for first name and last name'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label='Search for first name and last name'
                aria-describedby='basic-addon2'
              />
              <button
                type='button'
                onClick={() => searching()}
                className='input-group-text'
                id='basic-addon2'
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className='row w-100'>
          <div className='col mb-3 col-12 text-center'>
            <table className='table table-bordered'>
              <thead>
                <th onClick={() => sorting('firstName')}>First Name</th>
                <th onClick={() => sorting('lastName')}>Last Name</th>
                <th onClick={() => sorting('email')}>Email</th>
                <th>Profile</th>

                <th>Action</th>
              </thead>

              <tbody>
                {currentPosts.map((data) => {
                  return (
                    <Post key={data.id} deleteUser={deleteUser} user={data} />
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            postPerPage={postPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

export default Table;
