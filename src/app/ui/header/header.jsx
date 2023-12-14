"use client";

import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  // const dispatch = useDispatch();
  // const burger = useSelector((state) => state.burger.isOpen);
  return (
    <>
      <header className={`${styles["header"]} ${styles["header--find"]}`}>
        <div className={`${styles["header__logo"]}`}>
          <Image
            className={`${styles["header__logo--img"]}`}
            src="/imgs/logo.png"
            width={38}
            height={26}
            alt="logo"
          />
          <Image
            className={`${styles["header__logo--text"]}`}
            src="/imgs/logo-text.png"
            width={63.91}
            height={11}
            alt="logo-text"
          />
        </div>
        <div>
          <button className={`${styles["header__users"]}`}>Users</button>
          <button className={`${styles["header__sign-up"]}`}>Sign up</button>
        </div>
      </header>
    </>
  );
}
