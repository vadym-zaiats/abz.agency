"use client";

import styles from "./get.module.scss";
import { Card } from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { setPeoples } from "@/redux/slices/peopleSlice";
import { useEffect } from "react";

export default function Get() {
  const data = useSelector((state) => state.peoples.peoples);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPeoples());
  }, [dispatch]);
  console.log(data);
  return (
    <div className={styles[`get`]}>
      <h2 className={styles[`get__title`]}>Working with GET request</h2>
      <div className={styles[`get__cards`]}>
        {data.map(({ id, name, phone, email, positon, photo }) => {
          return (
            <Card
              key={id}
              name={name}
              phone={phone}
              email={email}
              positon={positon}
              photo={photo}
            />
          );
        })}
      </div>
    </div>
  );
}
