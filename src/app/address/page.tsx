"use client"

import styles from './page.module.scss';

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Input from "@/components/Input/page";

import { useAddressSotre } from '@/store/address';

import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';
import axios from 'axios';

import { parseCookies } from 'nookies';

export default function Address() {

  const { getAddress } = useAddressSotre();

  useEffect(() => {

    getAddress();

  }, [getAddress]);

  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [user_id, setUser_id] = useState(0);

  async function handleSave(event: FormEvent) {
    event.preventDefault();

    const { '@AeCAuth.token': token } = parseCookies();

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

  const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
  })

  const handleCep = async (event: ChangeEvent<HTMLInputElement>) => {
    const novoCep = event.target.value;
    setZip_code(novoCep);

    if (novoCep.length === 8) {
      const res = await apiCep.get(novoCep + '/json');

      const data = res.data;

      setStreet(data.logradouro);
      setZip_code(data.cep);
      setDistrict(data.bairro);
      setCity(data.localidade);
      setState(data.uf);
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
            onChange={handleCep}
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

        <button className={styles.button} onClick={() => {
          router.push('/');
          getAddress();
        }}>
          Voltar
        </button>

      </div>

      <Footer />
    </>
  )
}