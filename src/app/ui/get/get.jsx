"use client";

import styles from "./get.module.scss";
import { Card } from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { setPeople } from "@/redux/slices/peopleSlice";
import { useEffect, useState } from "react";
import { Preloader } from "../preloader/preloader";

export function Get() {
  const data = useSelector((state) => state.people.people);
  const dataIsLoading = useSelector((state) => state.people.dataIsLoading);
  const totalUsers = useSelector((state) => state.people.totalUsers);
  const dispatch = useDispatch();
  const [count, setCount] = useState(6);
  const [page, setPage] = useState(1);

  const handleIncrement = () => {
    setCount((prevState) => prevState + 6);
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    dispatch(setPeople({ page }));
  }, [dispatch, count, page]);

  return (
    <div className={styles[`get`]}>
      <h2 className={styles[`get__title`]}>Working with GET request</h2>
      <div className={styles[`get__cards`]}>
        {dataIsLoading && <Preloader />}
        {data.map(({ id, name, phone, email, position, photo }) => {
          return (
            <Card
              key={id}
              name={name}
              phone={phone}
              email={email}
              position={position}
              photo={photo}
            />
          );
        })}
      </div>
      {count <= totalUsers && (
        <button
          className={styles[`get__show-more`]}
          onClick={() => {
            handleIncrement();
          }}
        >
          Show more
        </button>
      )}
    </div>
  );
}
