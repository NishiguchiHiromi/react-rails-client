import React from 'react';
import { withRouter } from 'react-router-dom';
import useUserFormItems from 'hooks/useUserFormItems';
import api from 'service/api';
import UserForm from './UserForm';

const UserNew = ({ history }) => {
  const [formItems] = useUserFormItems();

  const createUser = (user) => {
    console.log('create');
    return api.createUser(user).then((res) => {
      history.push(`/user/${res.data.id}`);
    });
  };

  return formItems && (
    <UserForm
      formItems={formItems}
      isNewUser
      registerUser={(user) => createUser(user)}
    />
  );
};
export default withRouter(UserNew);
