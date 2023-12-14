"use client";

import styles from "./page.module.scss";
import Get from "./ui/get/get";

export default function Home() {
  return (
    <>
      {/* <div className={styles[`main__wall`]}>
        <div className={styles[`main__wrapper`]}>
          <h1 className={styles[`main__title`]}>
            Test assignment for front-end developer
          </h1>
          <p className={styles[`main__text`]}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button className={styles[`main__button`]}>Sign up</button>
        </div>
      </div> */}
      <Get />
    </>
  );
}
