import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserProfile(result);
      });
  }, []);
  return (
    <>
      {!userProfile ? (
        <h2 className='center'>Loading...</h2>
      ) : (
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
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px',
                }}
                src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
                alt=''
              />
            </div>
            <div>
              <h5>{userProfile.user.name}</h5>
              <h6>{userProfile.user.email}</h6>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '110%',
                }}
              >
                <h6>{userProfile.posts.length} Posts</h6>
                <h6>40 Followers</h6>
                <h6>40 Following</h6>
              </div>
            </div>
          </div>
          <div className='gallery'>
            {userProfile.posts.map((item) => {
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
      )}
    </>
  );
};

export default UserProfile;
