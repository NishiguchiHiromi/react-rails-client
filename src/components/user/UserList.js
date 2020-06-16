import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const UserList = ({ match, users }) => (
  <div>
    {users.map((user) => (
      <p key={user.id}>
        <Link to={`${match.url}/${user.id}`}>{user.name}</Link>
        {JSON.stringify(user)}
      </p>
    ))}
  </div>
);
export default withRouter(UserList);
