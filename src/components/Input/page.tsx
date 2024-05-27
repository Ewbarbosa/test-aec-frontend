import styles from './page.module.scss'

// componente para ser reutilizado em toda a aplicação

export default function Input({ ...rest }) {
  return (
    <input className={styles.input} {...rest} />
  )
}