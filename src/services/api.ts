import axios, { Axios, AxiosError } from 'axios';

import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '@/contexts/AuthContext';

export function setupAPIClient(ctx?: undefined) {

  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      Authorizatio: `Bearer ${cookies['@aec.token']}`
    }

  })

  api.interceptors.response.use(response => {
    return response;
  }, (err: AxiosError) => {
    if(err.response?.status === 401){
      // erro 401 deve deslogar o usuário
      if(typeof window !== undefined){
        // chama a funcao para deslogar
        signOut();
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(err);
  })

  return api;
}