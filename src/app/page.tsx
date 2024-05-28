"use client"

import styles from "./page.module.scss";

import Input from "@/components/Input/page";

import { useContext, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";

import { FormEvent, ChangeEvent } from "react";

import Link from "next/link";

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // FormEvent é apenas para não recarregar a pagina
  // então isso altera o comportamento para não recarregar
  async function handleLogin(event: FormEvent) {
    // utilizar preventDefault para não recarregar a pagina
    event.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha os campos');
      return;
    }

    let data = {
      email,
      password
    }

    await signIn(data);
  }

  return (

    <div className={styles.container}>

      <div className={styles.logo}>
        <p>Test AeC</p>
      </div>

      <p>Informe o e-mail e senha para acessar</p>
      <form className={styles.login} onSubmit={handleLogin}>

        <Input
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          type='text'
          placeholder='E-mail'
        />
        <Input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          type='password'
          placeholder='Senha'
        />

        <button
          className={styles.button}
          type="submit"
        >
          Entrar
        </button>
      </form>
      <Link href="/register">Cadastre-se</Link>

    </div>
  );
}
