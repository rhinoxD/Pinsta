import {
  useEffect,
  useState,
  createContext,
  useReducer,
  useContext,
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SubUserPosts from './components/screens/SubUserPosts';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/NewPassword';

export const UserContext = createContext();

const Routing = ({ theme }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      if (!history.location.pathname.startsWith(`/reset`))
        history.push('/signin');
    }
  }, []);
  return (
    <Switch>
      <Route path='/' component={() => <Home theme={theme} />} exact />
      <Route path='/profile' component={Profile} exact />
      <Route path='/signin' component={() => <Signin theme={theme} />} exact />
      <Route path='/signup' component={() => <Signup theme={theme} />} exact />
      <Route
        path='/create'
        component={() => <CreatePost theme={theme} />}
        exact
      />
      <Route path='/profile/:userId' component={UserProfile} exact />
      <Route
        path='/myfollowingposts'
        component={() => <SubUserPosts theme={theme} />}
        exact
      />
      <Route path='/reset' component={Reset} exact />
      <Route path='/reset/:token' component={NewPassword} exact />
    </Switch>
  );
};

const LightTheme = {
  pageBackground: 'white',
  titleColor: '#141E61',
  tagLineColor: 'black',
};

const DarkTheme = {
  pageBackground: '#282c36',
  titleColor: '#lightpink',
  tagLineColor: 'lavender',
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState('light');
  return (
    <ThemeProvider theme={themes[theme]}>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routing theme={theme} />
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
