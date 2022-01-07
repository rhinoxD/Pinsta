import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button className='btn waves-effect waves-light #2196f3 blue'>
          Login
        </button>
        <h6>
          <Link to='/signup'>Don't have an account?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signin;
