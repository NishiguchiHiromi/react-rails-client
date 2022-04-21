import React from 'react';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Admin,
  Resource,
  ListGuesser, EditGuesser, List, useListController,
} from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// import Resource from 'components/admin/custom/CustomResource';
import dataProvider from './provider/dataProvider';
import authProvider from './provider/authProvider';
import { UserList, UserEdit, UserCreate } from './users';
// import { PostList, PostEdit, PostCreate } from './posts';
import { HobbyList, HobbyEdit, HobbyCreate } from './hobbies';
import Dashboard from './Dashboard';
import Layout from './Layout';
import { CustomRoutes } from './CustomRoutes';
import Department from './Department';
// const theme = createMuiTheme({
//   palette: {
//     type: 'dark', // Switching the dark mode on is a single property value change.
//   },
// });

const ReactAdmin = () => (
  <Admin
    // theme={theme}
    layout={Layout}
    customRoutes={CustomRoutes}
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
    <Resource name="hobbies" list={HobbyList} edit={HobbyEdit} create={HobbyCreate} />
    {/* <Resource name="departments" path="departments/tree" index={DeptIndex} /> */}
  </Admin>
);

// const Departmentttt = (props) => {
//   console.log('list', props);
//   const listControllerParams = useListController(props);
//   console.log('listControllerParams', listControllerParams);
//   return (
//     <List {...props}><DeptIndex /></List>
//   );
// };

const DeptIndex = (props) => {
  console.log('DeptIndex', props);
  // return (<div>そしき</div>);
  return (<Department {...props} />);
};
export default ReactAdmin;

// // tutorial
// import * as React from 'react';
// import {
//   Admin, Resource, ListGuesser, List, Datagrid, TextField, EmailField, UrlField, ReferenceField, EditButton, EditGuesser,
// } from 'react-admin';

// import jsonServerProvider from 'ra-data-json-server';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// const App = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource name="posts" list={PostList} edit={EditGuesser} />
//     <Resource name="users" list={UserList} />
//   </Admin>
// );

// export default App;

// const UserList = (props) => (
//   <List {...props}>
//     <Datagrid rowClick="edit">
//       <TextField source="id" />
//       <TextField source="name" />
//       <TextField source="username" />
//       <EmailField source="email" />
//       <TextField source="address.street" />
//       <TextField source="phone" />
//       <TextField source="website" />
//       <TextField source="company.name" />
//     </Datagrid>
//   </List>
// );

// const PostList = (props) => (
//   <List {...props}>
//     <Datagrid>
//       <ReferenceField source="userId" reference="users">
//         <TextField source="id" />
//       </ReferenceField>
//       <TextField source="id" />
//       <TextField source="title" />
//       <TextField source="body" />
//       <EditButton />
//     </Datagrid>
//   </List>
// );
