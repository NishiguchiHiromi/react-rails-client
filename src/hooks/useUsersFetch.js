import { useEffect, useState } from 'react';
import api from '../service/api';

const useUsersFetch = () => {
  const [searchParams, setSearchParams] = useState({
    per: 3,
    page: 1,
    params: {},
  });
  const [usersInfo, setUsersInfo] = useState(null);

  const search = (params) => {
    setSearchParams({ ...searchParams, params, page: 1 });
  };

  const setPage = (page) => {
    setSearchParams({ ...searchParams, page });
  };

  useEffect(() => {
    const fetchUsers = () => {
      console.log('fetchUsers');
      api
        .users(searchParams)
        .then((res) => setUsersInfo(res.data))
        .catch((res) => console.log(res));
    };

    fetchUsers();
  }, [searchParams]);
  return [
    { searchParams, usersInfo },
    { search, setPage },
  ];
};
export default useUsersFetch;
