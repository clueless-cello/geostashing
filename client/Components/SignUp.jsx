import React from 'react';
import { withRouter } from 'react-router';
import UserCreationError from './ErrorMessages.jsx';

import auth from './../auth.js';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      creationError: false
    };
  }

  checkSignUpInfo(event) {

    event.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;

    if (confirmPassword === password) {
      auth.signup(username, password, (loggedIn) => {
        if (!loggedIn) {
          console.log('Not loggedin');

          return this.setState({
            error: true,
            creationError: true
          });
        }

        const { location } = this.props;

        if (location.state && location.state.nextPathname) {
          return this.props.router.replace(location.state.nextPathname);
        }

        return this.props.router.replace('/signIn');
      });
    }
  }

  // handleSubmit() {
  //   console.log('YOU MADE IT INTO HANDLESUBMIT');
  //   const path = '/';

  //   this.context.router.push(path);
  // }

  // checkSignUpInfo(event) {
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/users',
  //     dataType: 'json',
  //     data: {
  //       username: this.refs.username.value,
  //       password: this.refs.password.value
  //     },
  //     success: () => {
  //       console.log('AJAX sent SUCCESS');
  //       this.handleSubmit();
  //     },
  //     error: (error) => {
  //       console.log('AJAX sent FAIL!!!', error);
  //       this.setState({ creationError: true });
  //       this.setState({ username: '' });
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <h1>JOIN THE ADVENTURE</h1>
        <form onSubmit={this.checkSignUpInfo.bind(this)}>
          <h4>Username</h4>
          <input type="text" ref="username" />
          <h4>Password</h4>
          <input type="password" ref="password" />
          <h4>Confirm Password</h4>
          <input type="password" ref="confirmPassword" />
          <input type="submit" />
        </form>
        { this.state.creationError
          ? <UserCreationError />
          : null }
      </div>
    );
  }
}

SignUp.propTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object
};

export default withRouter(SignUp);
