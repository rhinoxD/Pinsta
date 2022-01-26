import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Home = ({ theme }) => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const linkColor = theme === 'light' ? 'black' : 'white';
  const bgColor = theme === 'light' ? 'white' : 'black';
  // console.log(state);
  // console.log(data);
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
  // const deleteComment = (commentId) => {
  //   fetch(`/deletecomment/${commentId}`, {
  //     method: 'delete',
  //     headers: {
  //       'Content-Type': ' application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  //     },
  //     body: JSON.stringify({
  //       commentId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const newData = data.map((item) => {
  //         console.log(item);
  //         const com =
  //           result &&
  //           result.comments.filter((comment) => {
  //             console.log(comment._id);
  //             return comment._id;
  //           });
  //         const comm =
  //           item &&
  //           item.comments.filter((comment) => {
  //             console.log(comment._id);
  //             return comment._id;
  //           });
  //         return comm !== com;
  //       });
  //       setData(newData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  // const deleteComment = (commentId) => {
  //   fetch(`/deletecomment/${commentId}`, {
  //     method: 'delete',
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const com = result.comments.filter((comment) => {
  //         console.log(comment._id);
  //         return comment._id;
  //       });
  //       const newData = data.filter((item) => {
  //         const comm = item.comments.filter((comment) => {
  //           console.log(comment._id);
  //           return comment._id;
  //         });
  //         return comm !== com;
  //       });
  //       setData(newData);
  //     });
  // };
  return (
    <div className='home'>
      {data.map((item) => {
        // console.log(item);
        return (
          <div
            className='card home-card'
            key={item._id}
            style={{ backgroundColor: bgColor }}
          >
            <h5 style={{ paddingLeft: '8px', paddingTop: '5px' }}>
              <Link
                to={
                  item.postedBy._id !== state.payload._id
                    ? `/profile/${item.postedBy._id}`
                    : '/profile'
                }
              >
                <span style={{ color: linkColor }}>{item.postedBy.name}</span>
              </Link>
              {item.postedBy._id === state.payload._id && (
                <i
                  className='material-icons'
                  style={{
                    color: 'red',
                    float: 'right',
                    padding: '0.2rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
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
              <h6 style={{ color: linkColor }}>
                {item.likes.length} {item.likes.length === 1 ? 'like' : 'likes'}
              </h6>
              <h6 style={{ color: linkColor }}>
                <strong>{item.title}</strong>
              </h6>
              <p style={{ color: linkColor }}>
                <em>{item.body}</em>
              </p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ color: linkColor }}>
                      <strong>{record.postedBy.name}</strong>
                    </span>{' '}
                    <span style={{ color: linkColor }}>{record.text}</span>
                    {/* {item.postedBy._id === state.payload._id && (
                      <i
                        className='material-icons'
                        style={{
                          color: 'red',
                          float: 'right',
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteComment(record._id)}
                      >
                        delete
                      </i>
                    )} */}
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
