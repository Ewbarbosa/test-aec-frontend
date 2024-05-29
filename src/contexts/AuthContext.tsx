"use client"

import { api } from '@/services/apiClient';

import { createContext, ReactNode, useState, useEffect } from 'react';

import { useRouter, redirect } from 'next/navigation';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;  
}

type UserProps = {
  id: number;
  name: string;
  email: string;
}

type SignProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){  
  try{
    destroyCookie(undefined, '@AeCAuth.token');
    redirect('/');
  } catch(erro) {
    console.log('Erro ao deslogar.: ' + erro);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {

  const router = useRouter();

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {

    // recupera o token armazenado
    const { '@AeCAuth.token': token } = parseCookies();    

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      })
        .catch(() => {
          // se deu erro deloga
          signOut();
        })
    }

  }, [])

  // faz uma requisição na api pra validar usuário e senha
  // se o retorno da api for 200 será salvo o token recebido
  // e no final redireciona para a HOME
  async function signIn({ email, password }: SignProps) {

    try {

      const res = await api.post('/login', {
        email,
        password
      });

      const { id, name, token } = res.data;

      setCookie(undefined, '@AeCAuth.token', token), {
        maxAge: 60 * 60 * 24, //expirar em um dia
        path: '/'
      };

      setUser({
        id,
        name,
        email
      });

      // passa para as proximas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/dashboard');

    } catch (err) {
      alert('Usuário ou senha inválido. Tente novamente.');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}