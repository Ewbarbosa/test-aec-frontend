"use client"

import styles from './page.module.scss'

import Input from '@/components/Input/page'

import { FormEvent, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = {
        name,
        email,
        password
      }

      const res = await api.post('/user', data);

      if (res.status === 200) {
        setName('');
        setEmail('');
        setPassword('');
        alert('Sucesso! Volte para a página inicial para acessar sua conta.');
      }

    } catch (err) {
      alert('Erro ao cadastrar, tente novamente.')
    }
  }

  return (
    <div className={styles.container}>

      <p>Preencha os campos para se cadastrar</p>

      <form className={styles.register} onSubmit={handleRegister}>

        <Input
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          type="text"
          placeholder="Nome completo"
        />

        <Input
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
        />

        <Input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
        />

        <button className={styles.button} type='submit'>
          Cadastrar
        </button>

      </form>

      <button className={styles.button} onClick={() => router.push('/')}>
        Voltar
      </button>

    </div>
  )

}