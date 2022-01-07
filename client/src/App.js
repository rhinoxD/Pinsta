import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' component={Home} exact />
      <Route path='/profile' component={Profile} exact />
      <Route path='/signin' component={Signin} exact />
      <Route path='/signup' component={Signup} exact />
      <Route path='/create' component={CreatePost} exact />
    </Router>
  );
}

export default App;
