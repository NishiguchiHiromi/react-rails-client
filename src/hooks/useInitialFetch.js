import { useEffect, useState } from 'react';
import api from 'components/admin/provider/api';
import {
  useVersion,
} from 'react-admin';

const useInitialFetch = (path) => {
  const [data, setData] = useState();
  const version = useVersion();
  useEffect(() => {
    console.log('initial fetch!!!!!!!!!!!', 'version', version);
    api.provider(path)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((res) => console.log(res));
  }, [path, version]);
  return data;
};

export default useInitialFetch;
