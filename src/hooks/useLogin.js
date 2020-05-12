import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../service/api';

const useLogin = () => {
  const history = useHistory();
  const [finishCheckLoggedIn, setFinishCheckLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  const login = ({ mail, password }) => api.login({ mail, password }).then((res) => {
    setLoginUser(res.data.loginUser);
    history.push('/mypage');
  });

  const logout = () => {
    api.logout().then(() => {
      setLoginUser(null);
      history.push('/login');
    });
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      console.log('login');
      api
        .checkLoggedIn()
        .then((res) => setLoginUser(res.data.loginUser))
        .catch((res) => console.warn(res))
        .then(() => setFinishCheckLoggedIn(true));
    };

    checkLoggedIn();
  }, []);
  return [
    { finishCheckLoggedIn, loginUser },
    { login, logout },
  ];
};
export default useLogin;
