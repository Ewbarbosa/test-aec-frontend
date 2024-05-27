"use client"

import styles from './page.module.scss'

import Input from '@/components/Input/page'

import { FormEvent } from 'react'

export default function Register() {

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

      </form>

    </div>
  )

}