import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch('/allposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);
  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const makeComment = (text, postId) => {
    const coms = document.querySelectorAll('.comments');
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': ' application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
    coms.forEach((com) => (com.value = ''));
  };
  return (
    <div className='home'>
      {data.map((item) => {
        return (
          <div className='card home-card' key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className='card-image'>
              {item.likes.includes(state.payload._id) ? (
                <img
                  src={item.photo}
                  alt=''
                  onDoubleClick={() => unlikePost(item._id)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <img
                  src={item.photo}
                  alt=''
                  onDoubleClick={() => likePost(item._id)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
            <div className='card-content'>
              {item.likes.includes(state.payload._id) ? (
                <i
                  className='material-icons'
                  style={{ color: 'red', cursor: 'Pointer' }}
                  onClick={() => unlikePost(item._id)}
                >
                  favorite
                </i>
              ) : (
                <i
                  className='material-icons'
                  style={{ color: 'red', cursor: 'Pointer' }}
                  onClick={() => likePost(item._id)}
                >
                  favorite_border
                </i>
              )}
              <h6>
                {item.likes.length} {item.likes.length === 1 ? 'like' : 'likes'}
              </h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span>
                      <strong>{record.postedBy.name}</strong>
                    </span>{' '}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input
                  className='comments'
                  type='text'
                  placeholder='Add a comment'
                />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
