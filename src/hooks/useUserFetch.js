import { useEffect, useState } from 'react';
import api from '../service/api';

const useUserFetch = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      console.log('fetchUser');
      api
        .get(id)
        .then((res) => setUser(res.data.user))
        .catch((res) => console.log(res));
    };

    fetchUser();
  }, [id]);
  return [user, null];
};
export default useUserFetch;
