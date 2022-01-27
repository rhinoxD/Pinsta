import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';

const Toggle = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.titleColor};
  color: ${(props) => props.theme.pageBackground};
  &:focus: {
    outline: none;
  }
  transition: all 0.5s ease;
  margin-left: auto;
`;

const Navbar = ({ theme, setTheme }) => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  function changeTheme() {
    if (theme === 'light') {
      document.body.style.background = '#000';
      document.body.style.color = '#fff';
      document.body.style.transition = 'all 0.5s ease';
      setTheme('dark');
    } else {
      document.body.style.background = '#fff';
      document.body.style.color = '#000';
      document.body.style.transition = 'all 0.5s ease';
      setTheme('light');
    }
  }
  const icon = theme === 'light' ? <HiMoon size={28} /> : <CgSun size={28} />;
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const linkColor = theme === 'light' ? 'black' : 'white';
  const bor = theme === 'light' ? '' : '1px groove grey';
  const renderList = () => {
    if (state) {
      return [
        <>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '63px',
              marginRight: '10px',
            }}
          >
            <Toggle onClick={changeTheme}>{icon}</Toggle>
          </li>
          <li key='1'>
            <i
              className='large material-icons modal-trigger'
              style={{ color: 'black', cursor: 'pointer' }}
              data-target='modal1'
            >
              <span style={{ color: linkColor }}>search</span>
            </i>
          </li>
          <li key='2'>
            <Link to='/profile'>
              <span style={{ color: linkColor }}>Profile</span>
            </Link>
          </li>
          <li key='3'>
            <Link to='/create'>
              <span style={{ color: linkColor }}>Create Post</span>
            </Link>
          </li>
          <li key='4'>
            <Link to='/myfollowingposts'>
              <span style={{ color: linkColor }}>My Following</span>
            </Link>
          </li>
          <li key='5'>
            <button
              className='btn #c62828 red darken-3'
              onClick={() => {
                localStorage.clear();
                dispatch({ type: 'CLEAR' });
                history.push('/signin');
              }}
              style={{ marginRight: '10px' }}
            >
              Logout
            </button>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '63px',
              marginRight: '10px',
            }}
          >
            <Toggle onClick={changeTheme}>{icon}</Toggle>
          </li>
          <li key='6'>
            <Link to='/signin'>
              <span style={{ color: linkColor }}>Login</span>
            </Link>
          </li>
          <li key='7'>
            <Link to='/signup'>
              {' '}
              <span style={{ color: linkColor }}>Signup</span>
            </Link>
          </li>
        </>,
      ];
    }
  };
  const fetchUsers = (query) => {
    setSearch(query);
    fetch('/search-users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  return (
    <nav>
      <div
        className={`nav-wrapper ${theme === 'light' ? 'white' : 'black'}`}
        style={{
          transition: 'all 0.5s ease',
          borderBottom: bor,
        }}
      >
        <Link to={state ? '/' : '/signin'} className='brand-logo left'>
          <span style={{ color: linkColor }}>Instagram</span>
        </Link>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
      <div
        id='modal1'
        className='modal'
        ref={searchModal}
        style={{ color: 'black' }}
      >
        <div className='modal-content'>
          <input
            type='text'
            placeholder='Search Users'
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className='collection' style={{ color: 'black' }}>
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state.payload._id
                      ? `/profile/${item._id}`
                      : '/profile'
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch('');
                  }}
                >
                  <li className='collection-item'>{item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className='modal-footer'>
          <button
            className='modal-close waves-effect waves-green btn-flat'
            onClick={() => setSearch('')}
          >
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
