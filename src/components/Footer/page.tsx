"use client"

import styles from './page.module.scss';

import { IoMdAddCircle, IoMdHome, IoMdExit } from "react-icons/io";

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { AuthContext } from "@/contexts/AuthContext";

export default function Footer() {

  const { signOut } = useContext(AuthContext);

  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <IoMdAddCircle size={30} onClick={() => router.push('/address')} />
      <IoMdHome size={30} onClick={() => router.push('/home')} />
      <IoMdExit size={30} onClick={signOut}/>
    </footer>
  )
}