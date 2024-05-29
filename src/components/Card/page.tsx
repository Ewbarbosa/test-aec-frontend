"use client"

import { useAddressSotre } from '@/store/address';

import styles from './page.module.scss';

import { MdEdit, MdDelete } from "react-icons/md";

import { useEffect } from 'react'

import { api } from '@/services/apiClient';

export default function Card() {

  const { address, getAddress } = useAddressSotre();  

  async function handleDelete(id: number) {

    try {

      const res = await api.delete('/address', {
        data: { id: id }
      })

      alert('Endereço excluído com sucesso!');

      getAddress();

    } catch {
      alert('Erro ao excluir');
    }

  }

  return (
    <>

      <div className={styles.container}>

        {
          address.length === 0 &&
          <h3>Nenhum registro encontrado</h3>
        }

        {address.map(item => (
          <div className={styles.card} key={item.id}>
            <h3>#{item.id}</h3>
            <h3>Logradouro: {item.street}</h3>
            <h3>Complemento: {item.complement}</h3>
            <h3>CEP: {item.zip_code}</h3>
            <h3>Bairro: {item.district}</h3>
            <h3>Cidade: {item.city}</h3>
            <h3>Estado: {item.state}</h3>

            <div className={styles.options}>
              <MdEdit size={25} />
              <MdDelete size={25} onClick={() => handleDelete(item.id)} />
            </div>

          </div>
        ))}

      </div>

    </>
  )
}