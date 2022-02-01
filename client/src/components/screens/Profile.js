import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');
  // console.log(state);
  useEffect(() => {
    fetch('/api/myposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.myPosts);
      });
  }, []);
  useEffect(() => {
    if (image) {
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
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({ pic: data.url }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state.payload, pic: result.pic })
              );
              dispatch({ type: 'UPDATEPFP', payload: result.pic });
              window.location.reload();
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [image]);
  const updatePfp = (file) => {
    setImage(file);
  };
  const deletePost = (postId) => {
    fetch(`/api/deletepost/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = mypics.filter((item) => {
          return item._id !== result._id;
        });
        setMypics(newData);
      });
  };
  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div
        className='main-profile'
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0',
          borderBottom: '1px solid grey',
          boxShadow: '0px 6px 5px -7px #222',
        }}
      >
        <div className='profile-image'>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px' }}
            src={state && state.payload.pic}
            alt=''
          />
        </div>
        <div className='details'>
          <h5>{state && state.payload.name}</h5>
          <h6>{state && state.payload.email}</h6>
          <div 
          className='pff'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '110%',
            }}
          >
            <h6>{mypics.length} Posts</h6>
            <h6>{state && state.payload.followers.length} Followers</h6>
            <h6>{state && state.payload.following.length} Following</h6>
          </div>
          <div className='file-field input-field update-pfp'>
            <div className='btn #2196f3 blue'>
              <span>Update PFP</span>
              <input
                type='file'
                onChange={(e) => updatePfp(e.target.files[0])}
              />
            </div>
            <div className='file-path-wrapper'>
              <input
                className='file-path validate'
                type='text'
                style={{ margin: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='gallery'>
        {mypics.map((item) => {
          return (
            <>
              <img
                key={item._id}
                className='item'
                src={item.photo}
                alt={item.title}
              />
              {item.postedBy._id === state.payload._id && (
                <i
                  className='material-icons'
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
