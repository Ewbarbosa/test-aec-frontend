"use client"

import styles from './page.module.scss'

import Input from '@/components/Input/page'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';

export default function Register() {

  const router = useRouter();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>

      <p>Preencha os campos para se cadastrar</p>

      <form className={styles.register} onSubmit={handleRegister}>

        <Input
          placeholder="Nome completo"
        />

        <Input
          placeholder="E-mail"
        />

        <Input
          placeholder="Senha"
        />

        <button className={styles.button} type='submit'>
          Cadastrar
        </button>

        <button className={styles.button} onClick={() => router.push('/')}>
          Voltar
        </button>

      </form>

    </div>
  )

}