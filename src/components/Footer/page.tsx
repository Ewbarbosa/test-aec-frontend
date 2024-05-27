import styles from './page.module.scss';

import { IoMdAddCircle, IoMdPerson, IoMdHome, IoMdExit } from "react-icons/io";

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <IoMdAddCircle size={30} />
      <IoMdPerson size={30} />
      <IoMdExit size={30} />
    </footer>
  )
}