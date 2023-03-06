import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Post = ({ user, deleteUser, EditUser }) => {
  let navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td style={{ width: '15%' }}>
          <img className='profile_img' src={user.img} alt='Profile image' />
        </td>
        <td>
          <a
            className='b-primary'
            onClick={() => {
              deleteUser(user._id);
            }}
          >
            Delete
          </a>
          ||{' '}
          <Link
            to={`/${user._id}`}
            onClick={() => {
              EditUser(user._id);
            }}
          >
            Edit
          </Link>
        </td>
      </tr>
    </>
  );
};

export default Post;
