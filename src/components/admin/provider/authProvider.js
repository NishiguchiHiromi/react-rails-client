import api from './api';

class AuthProvider {
  constructor() {
    this.isLoggedIn = undefined;
    this.authChecking = false;
    this.authCheckingPromise = null;
    this.loginUserInfo = null;
  }

  setLoginUserInfo(info) {
    this.loginUserInfo = info;
  }

  // called when the user attempts to log in
  login({ username, password }) {
    console.log('loginしたい', username, password);
    return api.login({ mail: username, password }).then((res) => {
      const { csrf_token, loginUser } = res.data;
      this.isLoggedIn = true;
      this.setLoginUserInfo(loginUser);
      api.setCsrfToken(csrf_token);
    });
  }

  // called when the user clicks on the logout button
  logout() {
    console.log('logoutしたい');
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      return api.logout();
    }
    this.isLoggedIn = false;
    return Promise.resolve();
  }

  // called when the API returns an error
  checkError(error) {
    console.log(error.response.status);
    // console.warn([e], e.response.status, e.response.statusText, e.message);
    if (error.response.status === 401 || error.response.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  }

  // called when the user navigates to a new location, to check for authentication
  checkAuth() {
    console.log('loginチェック');
    if (this.isLoggedIn === false) {
      // console.log('logoutしてます');
      return Promise.reject();
    }
    if (this.isLoggedIn && api.csrfTokenRecentryUpdated) {
      // console.log('csrfは最近更新されているのでOK');
      return Promise.resolve();
    }
    if (this.authChecking) return this.authCheckingPromise;
    // console.log('loginチェック通信 and csrf更新');
    this.authChecking = true;
    this.authCheckingPromise = api.checkLoggedIn()
      .then((res) => {
        this.authChecking = false;
        const { csrf_token, loginUser } = res.data;
        this.isLoggedIn = true;
        this.setLoginUserInfo(loginUser);
        api.setCsrfToken(csrf_token);
      }).catch((res) => {
        console.log('ログインしてない！', res);
        this.authChecking = false;
        this.isLoggedIn = false;
        return Promise.reject();
      });
    return this.authCheckingPromise;
  }

  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions() {
    return Promise.resolve();
  }
}

export default new AuthProvider();
