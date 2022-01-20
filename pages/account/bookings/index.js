import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { mybookings } from "../../../src/utils/fetchApi/classes";
import jwtDecode from "../../../src/utils/jwtDecode/jwtDecode";
import styles from "../../../styles/account/bookings/Index.module.css";
import MyBookingsCard from "../../../src/components/Card/MyBookingsCard";
import { TopBar } from "../../../src/components/navigation/TopBar";
import { Box } from "@mui/material";

export default function MyBookings() {
  const router = useRouter();
  const [data, setData] = useState();
  const { Id } = jwtDecode();

  useEffect(() => {
    mybookings(setData, Id);
  }, []);

  const handleOnClick = (id) => {
    router.push(`/account/bookings/${id}`);
  };

  return (
    <div>
      <Head>
        <title>My Bookings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar label={"My Bookings"} />
      <main className={styles.main}>
        <h1 className={styles.title}>My Bookings</h1>
        {data?.map((d) => (
          <Box component="div" key={d.id} onClick={() => handleOnClick(d.id)}>
            <MyBookingsCard data={d} />
          </Box>
        ))}
      </main>
    </div>
  );
}
