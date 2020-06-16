import { useEffect, useState } from 'react';
import api from '../service/api';

const useUserFetch = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      console.log('fetchUser');
      api
        .getUser(id)
        .then((res) => setUser(res.data))
        .catch((res) => console.log(res));
    };

    fetchUser();
  }, [id]);
  return [user, null];
};
export default useUserFetch;
