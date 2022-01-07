import React from 'react';

const Profile = () => {
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
            src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
            alt=''
          />
        </div>
        <div>
          <h5>Laura Wilson</h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '110%',
            }}
          >
            <h6>40 Posts</h6>
            <h6>40 Followers</h6>
            <h6>40 Following</h6>
          </div>
        </div>
      </div>
      <div className='gallery'>
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
        <img
          className='item'
          src='https://yt3.ggpht.com/VZdyGhjcWxPkljggdCqqj8sK8Xcy5NdrlJbgbwn0BD5hFdjz0NScRknEqPHEeECHj0I4iGqpPA=s900-c-k-c0x00ffffff-no-rj'
          alt=''
        />
      </div>
    </div>
  );
};

export default Profile;
