import axios from 'axios';
import qs from 'qs';

const paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'brackets' });

axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3000';
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Api {
  constructor() {
    this.csrfToken = '';
  }

  setCsrfToken(token) {
    this.csrfToken = token;
  }

  get headers() {
    return {
      'Content-Type': 'application/json;charset=utf-8',
      // カスタムヘッダがなければサーバー側で不正なリクエストと判定
      // => CSRF時に、カスタムヘッダを付けられた場合CORSのOriginの判定で弾く
      'My-Header': 'My-Header-Content',
      'X-CSRF-Token': this.csrfToken,
    };
  }

  checkLoggedIn() {
    return axios({
      method: 'get',
      url: '/api/v1/session',
      headers: this.headers,
    });
  }

  login({ mail, password }) {
    return axios({
      method: 'post',
      url: '/api/v1/session',
      headers: this.headers,
      data: { session: { mail, password } },
    });
  }

  logout() {
    return axios({
      method: 'delete',
      url: '/api/v1/session',
      headers: this.headers,
    });
  }

  users({ per, page, params }) {
    return axios({
      method: 'get',
      url: '/api/v1/users',
      headers: this.headers,
      params: { per, page, q: params },
      paramsSerializer,
    });
  }

  getUser(id) {
    return axios({
      method: 'get',
      url: `/api/v1/users/${id}`,
      headers: this.headers,
    });
  }

  createUser(user) {
    return axios({
      method: 'post',
      url: '/api/v1/users',
      headers: this.headers,
      data: { user },
    });
  }

  updateUser(user) {
    return axios({
      method: 'put',
      url: `/api/v1/users/${user.id}`,
      headers: this.headers,
      data: { user },
    });
  }

  deleteUser(id) {
    return axios({
      method: 'delete',
      url: `/api/v1/users/${id}`,
      headers: this.headers,
    });
  }

  userSearchForm() {
    return axios({
      method: 'get',
      url: '/api/v1/users/search_form',
      headers: this.headers,
    });
  }

  getDepartments() {
    return axios({
      method: 'get',
      url: '/api/v1/department',
      headers: this.headers,
    });
  }

  saveDepartments(departments) {
    return axios({
      method: 'post',
      url: '/api/v1/department',
      headers: this.headers,
      data: { departments },
    });
  }
}

export default new Api();
