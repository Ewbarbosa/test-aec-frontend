import axios, { AxiosError } from 'axios';

import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient(ctx?: undefined) {

  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      Authorization: `Bearer ${cookies['@AeCAuth.token']}`
    }

  })

  api.interceptors.response.use(response => {
    return response;
  }, (err: AxiosError) => {
    if (err.response?.status === 401) {
      // erro 401 deve deslogar o usuário
      if (typeof window !== undefined) {
        // chama a funcao para deslogar        
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(err);
  })

  return api;
}