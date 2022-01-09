import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone');
    data.append('cloud-name', 'dgcs2lm7o');
    fetch('https://api.cloudinary.com/v1_1/dgcs2lm7o/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'Invalid Email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green' });
          history.push('/signin');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };
  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='file-field input-field'>
          <div className='btn #2196f3 blue'>
            <span>Upload Pfp</span>
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          className='btn waves-effect waves-light #2196f3 blue'
          onClick={() => PostData()}
          disabled={!name || !email || !password}
        >
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
