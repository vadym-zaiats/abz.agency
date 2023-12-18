import styles from "./preloader.module.scss";

export const Preloader = () => {
  return (
    <div className={styles["preloader-container"]}>
      <div className={styles["preloader"]}></div>
    </div>
  );
};
