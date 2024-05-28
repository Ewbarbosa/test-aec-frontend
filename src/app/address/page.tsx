"use client"

import styles from './page.module.scss';

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Input from "@/components/Input/page";

import { FormEvent, useState, ChangeEvent, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { AuthContext } from '@/contexts/AuthContext';

import { api } from '@/services/apiClient';

import { parseCookies } from 'nookies';

export default function Address() {

  const { user } = useContext(AuthContext);

  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [user_id, setUser_id] = useState(0);

  async function handleSave(event: FormEvent) {
    event.preventDefault();

    const { '@aec.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser_id(id);
        
      })
        .catch(() => {
          // se deu erro deloga          
        })
    }

    try {
      let data = {
        street,
        complement,
        zip_code,
        district,
        city,
        state,
        user_id
      }

      const res = await api.post('/address', data);

      if (res.status === 200) {

        setStreet('');
        setComplement('');
        setZip_code('');
        setDistrict('');
        setCity('');
        setState('');

        alert('Salvo com sucesso!');
      }

    } catch (err) {
      alert('Erro ao salvar endereço.');
    }
  }

  const router = useRouter();
  return (
    <>
      <Header />
      <h3>Novo endereço</h3>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSave}>

          <Input
            value={street}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
            placeholder="Rua"
          />
          <Input
            value={complement}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setComplement(e.target.value)}
            placeholder="Complemento"
          />
          <Input
            value={zip_code}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setZip_code(e.target.value)}
            placeholder="CEP"
          />
          <Input
            value={district}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDistrict(e.target.value)}
            placeholder="Bairro"
          />
          <Input
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            placeholder="Cidade"
          />
          <Input
            value={state}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
            placeholder="Estado"
          />

          <button className={styles.button} type='submit'>
            Salvar
          </button>
        </form>

        <button className={styles.button} onClick={() => router.push('/')}>
          Voltar
        </button>
      </div>

      <Footer />
    </>
  )
}