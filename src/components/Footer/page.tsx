"use client"

import styles from './page.module.scss';

import { IoMdAddCircle, IoMdHome, IoMdExit } from "react-icons/io";

import { useRouter } from 'next/navigation';

import { destroyCookie } from 'nookies';

export default function Footer() {

  const router = useRouter();

  function signOut() {
    try {
      destroyCookie(undefined, '@aec.token');
      router.push('/');
    } catch (err) {
      console.log("erro ao deslogar");
    }
  }

  return (
    <footer className={styles.footer}>
      <IoMdAddCircle size={30} onClick={() => router.push('/address')} />
      <IoMdHome size={30} onClick={() => router.push('/dashboard')} />
      <IoMdExit size={30} onClick={signOut} />
    </footer>
  )
}