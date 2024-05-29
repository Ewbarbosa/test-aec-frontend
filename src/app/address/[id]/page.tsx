"use client"

import styles from '../page.module.scss';

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Input from "@/components/Input/page";

import { useAddressSotre } from '@/store/address';

import { FormEvent, useState, useEffect, ChangeEvent } from 'react';

import { api } from '@/services/apiClient';
import axios from 'axios';

import { parseCookies } from 'nookies';

import { useParams, useRouter } from 'next/navigation';

export default function AddressID() {

  const router = useRouter();

  const params = useParams();

  const { getAddress } = useAddressSotre();

  useEffect(() => {

    //getAddress();   

    searchById();

  }, []);

  const [id, setId] = useState(params.id);
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [user_id, setUser_id] = useState(0);

  async function searchById() {

    try {

      const res = await api.get('/addressId', {
        params: {
          id: params.id
        }
      });

      const data = res.data;

      setStreet(data.street);
      setComplement(data.complement);
      setZip_code(data.zip_code);
      setDistrict(data.district);
      setCity(data.city);
      setState(data.state);

    } catch {
      console.log('Erro ao buscar endereço.')
    }
  }

  async function handleUpdate(event: FormEvent) {
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
        id: parseInt(id as string),
        street,
        complement,
        zip_code,
        district,
        city,
        state
      }      

      const res = await api.put('/address', data);            

      if (res.status === 200) {

        setStreet('');
        setComplement('');
        setZip_code('');
        setDistrict('');
        setCity('');
        setState('');

        router.push('/dashboard')

        alert('Atualizado com sucesso!');
      }

    } catch (err) {
      alert('Erro ao atualizar endereço.');
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

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h3>Atualização de endereço #{params.id}</h3>
        <form className={styles.form} onSubmit={handleUpdate}>

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
            Atualizar
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