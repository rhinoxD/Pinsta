import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button className='btn waves-effect waves-light #2196f3 blue'>
          Sign Up
        </button>
        <h6>
          <Link to='/signin'>Already have an account?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
