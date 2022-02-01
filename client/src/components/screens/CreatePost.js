import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = ({ theme }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const linkColor = theme === 'light' ? 'black' : 'white';
  const bgColor = theme === 'light' ? 'white' : 'black';
  useEffect(() => {
    if (url) {
      fetch('/api/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: '#c62828 red darken-3' });
          } else {
            M.toast({
              html: 'Post Created Successfully',
              classes: '#43a047 green',
            });
            history.push('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url, body, history, title]);
  const postDetails = () => {
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
  return (
    <div
      className='card input-field'
      style={{
        margin: '30px auto',
        maxWidth: '500px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: bgColor,
      }}
    >
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ color: linkColor }}
      />
      <input
        type='text'
        placeholder='Body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ color: linkColor }}
      />
      <div className='file-field input-field'>
        <div className='btn #2196f3 blue'>
          <span>Upload Image</span>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='file-path-wrapper'>
          <input className='file-path validate' type='text' />
        </div>
      </div>
      <button
        className='btn waves-effect waves-light #2196f3 blue'
        onClick={() => postDetails()}
        disabled={!image}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
