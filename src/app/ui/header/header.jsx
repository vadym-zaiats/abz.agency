"use client";

import styles from "./header.module.scss";
// import Link from "next/link";
// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  // const dispatch = useDispatch();
  // const burger = useSelector((state) => state.burger.isOpen);
  return (
    <>
      <header className={`${styles["header"]} ${styles["header--find"]}`}>
        HEADER
      </header>
    </>
  );
}
