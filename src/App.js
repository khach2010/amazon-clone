import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';

const promise = loadStripe(
  'pk_test_51HhWbjBxoXAfaPYwVcQCvQh1VRugD4tieDYpCOrrnXgAAXz7pbvBh9az3l7kurwG5VjVBm5lGQdlsDZ3zdaz2aOr00AFcBDsi2'
);

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
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
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
