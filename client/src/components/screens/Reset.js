import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
const Reset = ({ theme }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const linkColor = theme === 'light' ? 'black' : 'white';
  const bgColor = theme === 'light' ? 'white' : 'black';
  const bor = theme === 'light' ? '' : '1px groove grey';
  const PostData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'Invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/api/reset-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/api/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='mycard'>
      <div
        className='card auth-card input-field'
        style={{ backgroundColor: bgColor, border: bor }}
      >
        <h2 style={{ color: linkColor }}>Instagram</h2>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: linkColor, fontStyle: 'italic' }}
        />
        <button
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
          style={{ margin: '15px 0 0 0' }}
          onClick={() => PostData()}
        >
          Reset password
        </button>
      </div>
    </div>
  );
};

export default Reset;
