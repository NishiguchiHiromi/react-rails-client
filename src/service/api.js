import axios from 'axios';
import qs from 'qs';

const paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'brackets' });

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Api {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      // カスタムヘッダがなければサーバー側で不正なリクエストと判定
      // => CSRF時に、カスタムヘッダを付けられた場合CORSのOriginの判定で弾く
      'My-Header': 'My-Header-Content',
      // "My-Header2": "My-Header-Content"
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

  get(id) {
    return axios({
      method: 'get',
      url: `/api/v1/users/${id}`,
      headers: this.headers,
    });
  }

  post(user) {
    return axios({
      method: 'post',
      url: '/api/v1/users',
      headers: this.headers,
      data: { user },
    });
  }

  update(user) {
    return axios({
      method: 'put',
      url: `/api/v1/users/${user.id}`,
      headers: this.headers,
      data: { user },
    });
  }

  delete(id) {
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
}

export default new Api();
