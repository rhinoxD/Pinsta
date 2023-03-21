import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'

const Signin = ({ theme }) => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const linkColor = theme === 'light' ? 'black' : 'white'
  const bgColor = theme === 'light' ? 'white' : 'black'
  const bor = theme === 'light' ? '' : '1px groove grey'
  const PostData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'Invalid Email', classes: '#c62828 red darken-3' })
      return
    }
    fetch('/api/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' })
        } else {
          localStorage.setItem('jwt', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          dispatch({ type: 'USER', payload: data.user })
          M.toast({ html: 'Logged In Successfully', classes: '#43a047 green' })
          history.push('/')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className='my-card'>
      <div
        className='card auth-card input-field'
        style={{ backgroundColor: bgColor, border: bor }}
      >
        <h2 style={{ color: linkColor }}>Pinsta</h2>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: linkColor, fontStyle: 'italic' }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ color: linkColor, fontStyle: 'italic' }}
        />
        <button
          className='btn waves-effect waves-light #2196f3 blue'
          onClick={() => PostData()}
          disabled={!email || !password}
          style={{ margin: '15px 0 10px 0' }}
        >
          Login
        </button>
        <h6>
          <Link to='/api/signup'>
            <span style={{ color: linkColor, fontStyle: 'oblique' }}>
              Don't have an account?
            </span>
          </Link>
        </h6>
        <p>
          <Link to='/reset'>
            <span style={{ color: linkColor, fontStyle: 'italic' }}>
              Forgot Password
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
