import React from 'react';
import { withRouter } from 'react-router-dom';
import useUserFetch from '../hooks/useUserFetch';
import useUserFormItems from '../hooks/useUserFormItems';
import api from '../service/api';
import UserForm from './UserForm';

const UserEdit = ({ match, history }) => {
  const [formItems] = useUserFormItems();
  const [user] = useUserFetch(match.params.id);

  const updateUser = (u) => api.update(u).then(() => {
    history.push(`/user/${u.id}`);
  });

  return (
    user && (
      <UserForm
        user={user}
        formItems={formItems}
        registerUser={(u) => updateUser(u)}
      />
    )
  );
};
export default withRouter(UserEdit);
