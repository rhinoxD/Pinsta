import { useEffect, createContext, useReducer, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/signin');
    }
  }, []);
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/profile' component={Profile} exact />
      <Route path='/signin' component={Signin} exact />
      <Route path='/signup' component={Signup} exact />
      <Route path='/create' component={CreatePost} exact />
      <Route path='/profile/:userId' component={UserProfile} exact />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
