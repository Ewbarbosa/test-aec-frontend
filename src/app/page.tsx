"use client"

import styles from "./page.module.scss";

import Input from "@/components/Input/page";

import { FormEvent } from "react";

import Link from "next/link";

export default function Home() {

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
  }
  return (

    <div className={styles.container}>

      <div className={styles.logo}>
        <p>Test AeC</p>
      </div>

      <p>Informe o e-mail e senha para acessar</p>
      <form className={styles.login} onSubmit={handleLogin}>

        <Input
          type='text'
          placeholder='E-mail'
        />
        <Input
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
