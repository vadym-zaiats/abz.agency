import Image from "next/image";
import styles from "./card.module.scss";

export function Card({ name, phone, email, positon, photo }) {
  return (
    <div className={styles[`card`]}>
      <img className={`${styles["card__photo"]}`} src={photo} alt="photo" />
      <p className={`${styles["card__name"]}`}>{name}</p>
      <p className={`${styles["card__position"]}`}>{positon}</p>
      <p className={`${styles["card__email"]}`}>{email}</p>
      <p className={`${styles["card__phone"]}`}>{phone}</p>
    </div>
  );
}
