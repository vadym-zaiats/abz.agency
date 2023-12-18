import Image from "next/image";
import styles from "./card.module.scss";

export function Card({ name, phone, email, position, photo }) {
  return (
    <div className={styles[`card`]}>
      <img className={`${styles["card__photo"]}`} src={photo} alt="photo" />
      <p className={`${styles["card__name"]}`} data-fullname={name}>
        {name}
      </p>
      <p className={`${styles["card__position"]}`}>{position}</p>
      <p className={`${styles["card__email"]}`} data-fullemail={email}>
        {email}
      </p>
      <p className={`${styles["card__phone"]}`}>{phone}</p>
    </div>
  );
}
