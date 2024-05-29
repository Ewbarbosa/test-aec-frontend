import styles from "./page.module.scss";

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Card from "@/components/Card/page";

export default function Dashboard() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <h3>Minha lista de endereços</h3>
        <Card />
      </div>

      <Footer />
    </>
  )
}