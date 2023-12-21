import Header from "@/components/Header/Header";
import Sidemenu from "@/components/Sidemenu/Sidemenu";
import { clsx } from "clsx";
import { ReactNode } from "react";
import styles from "./MenuLayout.module.css";

interface Props {
  children: ReactNode;
}

const MenuLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid__sidemenu}>
        <Sidemenu />
      </div>
      <div className={styles.grid__header}>
        <Header />
      </div>
      <div className={clsx(styles.grid__main, styles.main)}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MenuLayout;
