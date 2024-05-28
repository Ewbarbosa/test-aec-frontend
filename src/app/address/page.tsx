"use client"

import styles from './page.module.scss';

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Input from "@/components/Input/page";

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Address() {

  async function handleSave(event: FormEvent) {
    event.preventDefault();    
  }

  const router = useRouter();
  return (
    <>
      <Header />
      <h3>Novo endereço</h3>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSave}>

          <Input
            placeholder="Rua"
          />
          <Input
            placeholder="Complemento"
          />
          <Input
            placeholder="CEP"
          />
          <Input
            placeholder="Bairro"
          />
          <Input
            placeholder="Cidade"
          />
          <Input
            placeholder="Estado"
          />

          <button className={styles.button} type='submit'>
            Salvar
          </button>

          <button className={styles.button} onClick={() => router.push('/')}>
            Voltar
          </button>
        </form>
      </div>

      <Footer />
    </>
  )
}