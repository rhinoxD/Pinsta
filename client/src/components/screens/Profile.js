import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // console.log(state);
  useEffect(() => {
    fetch('/myposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.myPosts);
      });
  }, []);
  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0',
          borderBottom: '1px solid grey',
          boxShadow: '0px 6px 5px -7px #222',
        }}
      >
        <div>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px' }}
            src={state && state.payload.pic}
            alt=''
          />
        </div>
        <div>
          <h5>{state && state.payload.name}</h5>
          <h6>{state && state.payload.email}</h6>
          <div
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
        </div>
      </div>
      <div className='gallery'>
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className='item'
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
