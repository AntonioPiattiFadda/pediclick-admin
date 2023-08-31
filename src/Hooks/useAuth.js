import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import endPoints from '../Services';

export function useAuth() {
  const [user, setUser] = useState('');

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const data = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    );
    if (data && data.data.rta.token) {
      Cookies.set('Token', data.data.rta.token, { expires: 7 });
      const token = data.data.rta.token;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(data.data.rta.user);
    } else {
      console.error('No se pudo obtener el access_token');
    }
  };
  const logOut = () => {
    setUser(null);
    Cookies.remove('Token');
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logOut,
  };
}
