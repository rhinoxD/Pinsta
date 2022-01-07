import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' component={Home} exact />
      <Route path='/profile' component={Profile} exact />
      <Route path='/signin' component={Signin} exact />
      <Route path='/signup' component={Signup} exact />
    </Router>
  );
}

export default App;
