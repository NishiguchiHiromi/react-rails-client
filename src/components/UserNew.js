import React from 'react';
import { withRouter } from 'react-router-dom';
import useUserFormItems from '../hooks/useUserFormItems';
import api from '../service/api';
import UserForm from './UserForm';

const UserNew = ({ history }) => {
  const [formItems] = useUserFormItems();

  const createUser = (user) => {
    console.log('create');
    return api.post(user).then((res) => {
      history.push(`/user/${res.data.user.id}`);
    });
  };

  return formItems && (
    <UserForm
      formItems={formItems}
      registerUser={(user) => createUser(user)}
    />
  );
};
export default withRouter(UserNew);
