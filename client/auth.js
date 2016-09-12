module.exports = {
  signup(username, password, callback) {
    const cb = callback;

    if (document.cookie) {
      if (cb) {
        console.log('There is a callback!');
        cb(true);

        return;
      }

      this.onChange(true);

      return;
    }

    const endpoint = '/api/users';

    /*global $*/
    $.ajax({
      url: endpoint,
      method: 'POST',
      dataType: 'json',
      data: {
        username,
        password
      },
      success: () => {
        if (cb) {
          cb(true);

          return;
        }
        this.onChange(true);
      },
      error: (err) => {
        console.log(err);
        if (cb) {
          cb(false);

          return;
        }
      }
    });

  },

  login(username, password, callback) {
    const cb = callback;

    //Look to see if a session(cookie) is assigned
    if (document.cookie) {
      if (cb) {
        cb(true);

        return;
      }
      this.onChange(true);

      return;
    }

    //Make a request to endpoint /api/users/:name
    const endpoint = `/api/users/${username}`;

    $.ajax({
      url: endpoint,
      method: 'POST',
      dataType: 'json',
      data: {
        username,
        password
      },
      success: () => {
        if (cb) {
          cb(true);

          return;
        }
        this.onChange(true);
      },
      error: (err) => {
        console.log('This is the error within login Auth', err);
        if (cb) {
          cb(false);

          return;
        }
      }
    });
  },

  getToken() {
    //This will be get session cookie
    return document.cookie;
  },

  logout(cb) {
    this.deleteAllCookies();
    if (cb) {
      cb();

      return;
    }
    this.onChange(false);

    return;
  },

  loggedIn() {
    //document.cookie instead of localStorage
    return Boolean(document.cookie);
  },

  deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let index = 0; index < cookies.length; index += index + 1) {
      const cookie = cookies[index];
      const eqPos = cookie.indexOf('=');
      const notFound = -1;

      const name = eqPos > notFound
        ? cookie.substr(0, eqPos)
        : cookie;

      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
};
