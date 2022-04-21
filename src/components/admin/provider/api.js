import { HttpError } from 'react-admin';
import axios from 'axios';
import qs from 'qs';

const paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'brackets' });

class Api {
  static DOMAIN = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3000'

  static API_VERSION = '/api/v1'

  static BASE_URL = Api.DOMAIN + Api.API_VERSION

  constructor() {
    this.csrfTokenLastUpdatedAt = null;
    this.csrfToken = null;
    axios.defaults.withCredentials = true;
    // axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3000';
    // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
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

  setCsrfToken(token) {
    this.csrfToken = token;
    this.csrfTokenLastUpdatedAt = Date.now();
  }

  get csrfTokenRecentryUpdated() {
    return this.csrfToken && Date.now() < this.csrfTokenLastUpdatedAt + 1800000;
  }

  provider(path, options = {}) {
    const {
      baseUrl = Api.BASE_URL, method, headers, body, params,
    } = options;
    return axios({
      method,
      url: `${baseUrl}/${path}`,
      headers: { ...this.headers, ...headers },
      data: body,
      params,
      paramsSerializer,
    });
    // .catch((e) => {
    //   const { response: res, message } = e;
    //   console.warn([e], e.response.status, e.response.statusText, e.message);
    //   return Promise.reject(
    //     new HttpError(
    //       message || res.statusText,
    //       res.status,
    //       res.data,
    //     ),
    //   );
    // });
  }

  checkLoggedIn() {
    return this.provider('session', { method: 'get' });
  }

  login({ mail, password }) {
    return this.provider('session', {
      method: 'post',
      body: { session: { mail, password } },
    });
  }

  logout() {
    return this.provider('session', { method: 'delete' });
  }

  // users({ per, page, params }) {
  //   return axios({
  //     method: 'get',
  //     url: '/api/v1/users',
  //     headers: this.headers,
  //     params: { per, page, q: params },
  //     paramsSerializer,
  //   });
  // }

  // getUser(id) {
  //   return axios({
  //     method: 'get',
  //     url: `/api/v1/users/${id}`,
  //     headers: this.headers,
  //   });
  // }

  // createUser(user) {
  //   return axios({
  //     method: 'post',
  //     url: '/api/v1/users',
  //     headers: this.headers,
  //     data: { user },
  //   });
  // }

  // updateUser(user) {
  //   return axios({
  //     method: 'put',
  //     url: `/api/v1/users/${user.id}`,
  //     headers: this.headers,
  //     data: { user },
  //   });
  // }

  // deleteUser(id) {
  //   return axios({
  //     method: 'delete',
  //     url: `/api/v1/users/${id}`,
  //     headers: this.headers,
  //   });
  // }

  // userSearchForm() {
  //   return axios({
  //     method: 'get',
  //     url: '/api/v1/users/search_form',
  //     headers: this.headers,
  //   });
  // }

  // getDepartments() {
  //   return axios({
  //     method: 'get',
  //     url: '/api/v1/department',
  //     headers: this.headers,
  //   });
  // }

  // saveDepartments(departments) {
  //   return axios({
  //     method: 'post',
  //     url: '/api/v1/department',
  //     headers: this.headers,
  //     data: { departments },
  //   });
  // }
}

export default new Api();
