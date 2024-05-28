"use client"


import styles from './page.module.scss';

import { IoMdAddCircle, IoMdHome, IoMdExit } from "react-icons/io";

import { useRouter } from 'next/navigation';

export default function Footer() {

  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <IoMdAddCircle size={30} onClick={() => router.push('/address')} />
      <IoMdHome  size={30} onClick={() => router.push('/home')}/>
      <IoMdExit size={30} />
    </footer>
  )
}