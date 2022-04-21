// import { stringify } from 'query-string';
import qs from 'qs';
import api from './api';
// import handleUserProfile from './handleUserProfile';

const paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'brackets' });

const dataProvider = {
  getList: (resource, params) => {
    console.log('getList', resource, params);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const condition = {
      s: [field, order].join(' '),
      ...params.filter,
      // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    };
    return api.provider(resource, {
      params: { per: perPage, page, q: condition },
    }).then((res) => ({
      data: res.data[resource],
      total: res.data.count,
    }));
  },

  getOne: (resource, params) => {
    console.log('getOne', resource, params);
    return api.provider(`${resource}/${params.id}`)
      .then((res) => ({
        data: res.data,
      }));
  },

  getMany: (resource, params) => {
    console.log('getMany', resource, params);
    const condition = {
      id_in: params.ids,
    };
    return api.provider(resource, {
      params: { q: condition },
    }).then((res) => ({
      data: res.data[resource],
      total: res.data.count,
    }));
  },

  create: (resource, params) => {
    console.log('create', resource, params);
    return api.provider(resource, {
      method: 'POST',
      body: { [resource]: params.data },
    }).then((res) => ({
      data: res.data,
    }));
  },

  update: (resource, params) => {
    console.log('update', resource, params);
    return api.provider(`${resource}/${params.id}`, {
      method: 'PUT',
      body: { [resource]: params.data },
    }).then((res) => ({ data: res.data }));
  },

  // 未検証
  updateMany: (resource, params) => {
    console.log('updateMany', resource, params);
    return Promise.all(
      params.ids.map((id) => api.provider(`${resource}/${id}`, {
        method: 'PUT',
        body: { [resource]: params.data.find((s) => s.id === id) },
      })),
    ).then((responses) => ({ data: responses.map((res) => res.data.id) }));
  },

  delete: (resource, params) => {
    console.log('delete', resource, params);
    return api.provider(`${resource}/${params.id}`, {
      method: 'DELETE',
    }).then((res) => ({ data: res.data }));
  },

  deleteMany: (resource, params) => {
    console.log('deleteMany', resource, params);
    return Promise.all(
      params.ids.map((id) => api.provider(`${resource}/${id}`, {
        method: 'DELETE',
      })),
    ).then((responses) => ({ data: responses.map((res) => res.data.id) }));
  },

  // 以下未対応
  getManyReference: (resource, params) => {
    console.log('getManyReference', resource, params);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${resource}?${paramsSerializer(query)}`;

    return api.provider(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },
};
export default dataProvider;
// export default handleUserProfile(dataProvider);
