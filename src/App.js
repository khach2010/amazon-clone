import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import './App.css';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will run when the app component load...

    auth.onAuthStateChanged(authUser => {
      console.log('this user is:', authUser);

      if (authUser) {
        //the user is just logged in or was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
