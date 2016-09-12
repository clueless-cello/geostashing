import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './Components/App.jsx';
import Welcome from './Components/Welcome.jsx';
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';
import Logout from './Components/Logout.jsx';

import auth from './auth.js';

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/SignIn',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Welcome}></Route>
        {
        //this just makes it easier to access the app without logging in
        }
        <Route path="/dash" component={App}></Route>
        <Route path="/home" component={App} onEnter={requireAuth}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/signIn" component={SignIn}></Route>
        <Route path="/signUp" component={SignUp}></Route>
      </Router>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));

//IndexRoute is th e default route
//BrowserHistory instead of hash history
//<Route path="*" component={Error}></Route> makesure to put on bottom
