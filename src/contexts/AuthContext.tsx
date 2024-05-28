"use client"

import { api } from '@/services/apiClient';

import { createContext, ReactNode, useState } from 'react';

import { useRouter } from 'next/navigation';

import { destroyCookie, setCookie } from 'nookies';

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;
  signOut: () => void;
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

export function AuthProvider({ children }: AuthProviderProps) {

  const router = useRouter();

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  // destroi o cookie armazenado e redireciona para a rota inicial
  function signOut() {
    try {      
      destroyCookie(undefined, '@aec.token');
      router.push('/')
    } catch (err) {
      console.log("erro ao deslogar");
    }
  }

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

      setCookie(undefined, '@aec.token', token), {
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

      router.push('/home');

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}