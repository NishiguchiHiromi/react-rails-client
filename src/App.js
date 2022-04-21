import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from 'components/admin';
import PublicRoute from 'components/routes/PublicRoute';
import Auth from './components/Auth';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/public">
          <PublicRoute />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

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
