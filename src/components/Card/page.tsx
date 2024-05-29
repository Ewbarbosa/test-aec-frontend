"use client"

import { useAddressSotre } from '@/store/address';

import styles from './page.module.scss';

import { MdEdit, MdDelete } from "react-icons/md";

import { useEffect } from 'react'

import { api } from '@/services/apiClient';

import * as XLSX from "xlsx";

import { useRouter } from 'next/navigation';

export default function Card() {

  const router = useRouter();

  const { address, getAddress } = useAddressSotre();

  useEffect(() => {

    getAddress()

  }, [getAddress]);

  async function handleDelete(id: number) {
    try {

      const res = await api.delete('/address', {
        data: { id: id }
      })

      if (res.status === 200) {
        alert('Endereço excluído com sucesso!');

        getAddress();
      }

    } catch {
      alert('Erro ao excluir');
    }
  }

  function exportDataNew() {

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils?.json_to_sheet(address);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de endereços');

    XLSX.writeFile(workbook, `enderecos.xlsx`);
  }

  return (
    <>

      <div className={styles.container}>

        {
          address.length === 0 &&
          <h3>Nenhum registro encontrado</h3>
        }

        <button className={styles.btExport} onClick={exportDataNew}>Exportar para Excel</button>

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
              <MdEdit size={25} onClick={() => router.push('/address/' + item.id)} />
              <MdDelete size={25} onClick={() => handleDelete(item.id)} />
            </div>

          </div>
        ))}

      </div>

    </>
  )
}