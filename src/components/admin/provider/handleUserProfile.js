// import {
//   useAuthProvider,
//   CREATE,
//   DELETE,
//   DELETE_MANY,
//   GET_LIST,
//   GET_MANY,
//   GET_MANY_REFERENCE,
//   GET_ONE,
//   UPDATE,
//   UPDATE_MANY,
// } from 'react-admin';
// import store, { USER_INFO } from './store';

// const fetchMap = {
//   [CREATE]: 'create',
//   [DELETE]: 'delete',
//   [DELETE_MANY]: 'deleteMany',
//   [GET_LIST]: 'getList',
//   [GET_MANY]: 'getMany',
//   [GET_MANY_REFERENCE]: 'getManyReference',
//   [GET_ONE]: 'getOne',
//   [UPDATE]: 'update',
//   [UPDATE_MANY]: 'updateMany',
// };

// // const hoge = useAuthProvider();
// // console.log('auth', hoge);

// const handleUserProfile = (dataProvider) => (verb, resource, params) => {
//   console.log(dataProvider, verb, fetchMap[verb], resource, params);
//   const fetchType = fetchMap[verb];
//   if (resource === 'profile') {
//     console.log(verb, GET_ONE, verb === GET_ONE);
//     if (verb === GET_ONE) {
//       console.log(store);
//       return Promise.resolve({ data: store[USER_INFO] });
//     }
//   }

//   // Fallback to the dataProvider default handling for all other resources
//   return dataProvider[fetchType](resource, params);
// };
// export default handleUserProfile;
