import { useEffect, useState } from 'react';
import api from '../service/api';

const useUserFormItems = () => {
  const [userFormItems, setUserFormItems] = useState({});

  useEffect(() => {
    const fetchUserFormItems = () => {
      console.log('fetchUserFormItems');
      api
        .userSearchForm()
        .then((res) => setUserFormItems(res.data))
        .catch((res) => console.log(res));
    };

    fetchUserFormItems();
  }, []);
  return [userFormItems, null];
};
export default useUserFormItems;
