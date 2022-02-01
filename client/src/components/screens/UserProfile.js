import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.payload.following.includes(userId) : true
  );
  useEffect(() => {
    fetch(`/api/user/${userId}`, {
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
  const followUser = async () => {
    try {
      const res = await fetch('/follow', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      });
      const data = await res.json();
      dispatch({
        type: 'UPDATE',
        payload: { following: data.following, followers: data.followers },
      });
      localStorage.setItem('user', JSON.stringify(data));
      setUserProfile((prevState) => {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, data._id],
          },
        };
      });
      setShowFollow(false);
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async () => {
    try {
      const res = await fetch('/unfollow', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          unfollowId: userId,
        }),
      });
      const data = await res.json();
      dispatch({
        type: 'UPDATE',
        payload: { following: data.following, followers: data.followers },
      });
      localStorage.setItem('user', JSON.stringify(data));
      setUserProfile((prevState) => {
        const newFollower = prevState.user.followers.filter(
          (item) => item !== data._id
        );
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: newFollower,
          },
        };
      });
      setShowFollow(true);
    } catch (error) {
      console.log(error);
    }
  };
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
                src={userProfile.user.pic}
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
                <h6>{userProfile.user.followers.length} Followers</h6>
                <h6>{userProfile.user.following.length} Following</h6>
              </div>
              {showFollow ? (
                <button
                  className='btn waves-effect waves-light #2196f3 blue'
                  style={{ marginTop: '6px' }}
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  className='btn waves-effect waves-light #2196f3 blue'
                  style={{ marginTop: '6px' }}
                  onClick={() => unfollowUser()}
                >
                  Unfollow
                </button>
              )}
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
