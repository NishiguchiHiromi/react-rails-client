import React from 'react';
import { withRouter } from 'react-router-dom';
import useUserFetch from 'hooks/useUserFetch';
import api from 'service/api';

const UserDetail = ({ match, history }) => {
  const [user] = useUserFetch(match.params.id);

  const editUser = () => {
    history.push(`${match.url}/edit`);
  };

  const deleteUser = () => {
    api
      .deleteUser(match.params.id)
      .then(() => {
        history.push('/user');
      })
      .catch((res) => console.log(res));
  };

  return (
    <div>
      User Detail Area
      {user && (
        <p>
          {JSON.stringify(user)}
          <button type="button" onClick={() => editUser()}>edit</button>
          <button type="button" onClick={() => deleteUser()}>delete</button>
        </p>
      )}
    </div>
  );
};
export default withRouter(UserDetail);
