import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const UserList = ({ match, users }) => (
  <div>
    {users.map((user) => (
      <p key={user.id}>
        id:
        {' '}
        {user.id}
        , name:
        {' '}
        <Link to={`${match.url}/${user.id}`}>{user.name}</Link>
        , mail:
        {' '}
        {user.mail}
      </p>
    ))}
  </div>
);
export default withRouter(UserList);
