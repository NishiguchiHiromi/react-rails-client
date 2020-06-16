import React from 'react';
import { withRouter } from 'react-router-dom';
import useUserFormItems from 'hooks/useUserFormItems';
import useUsersFetch from 'hooks/useUsersFetch';
import Paginator from 'shared/Paginator';
import UserList from './UserList';
import UserSearch from './UserSearch';

const UserIndex = () => {
  const [formItems] = useUserFormItems();
  const [{ searchParams, usersInfo }, { search, setPage }] = useUsersFetch();

  return (
    <>
      <UserSearch
        searchUser={(params) => search(params)}
        formItems={formItems}
      />
      {usersInfo
        && (
        <Paginator
          count={usersInfo.count}
          per={searchParams.per}
          page={searchParams.page}
          setPage={(page) => setPage(page)}
        >
          <UserList users={usersInfo.users} />
        </Paginator>
        )}
    </>
  );
};
export default withRouter(UserIndex);
