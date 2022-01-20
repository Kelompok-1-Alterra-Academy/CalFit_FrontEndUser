import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { parseCookies } from "nookies";
import { Grid, Typography, Box, Button } from "@mui/material";
import { OndemandVideo, FitnessCenter, AccessTime } from "@mui/icons-material";
import { TopBar } from "../../../../src/components/navigation/TopBar";
import baseApi from "../../../../src/utils/fetchApi/api";
import styles from "../../../../styles/account/bookings/[id]/Index.module.css";
export default function BookingDetails() {
  const route = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    const id = route.query.id;
    const { token } = parseCookies();
    baseApi
      .get(`bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data: { data } }) => setData(data));
  }, []);

  return (
    <>
      <Head>
        <title>Booking Details</title>
      </Head>
      <TopBar label="Booking Details" />
      <Box className={styles.main}>
        <Typography variant="h1">
          {data?.status !== "waiting" ? "Booking Confirmed" : "Booking Waiting"}
        </Typography>
        <Typography variant="h3" className={styles.bookingdetails}>
          Booking Details
        </Typography>
        <Grid container>
          <Grid item xs={2}>
            <OndemandVideo className={styles.icon} />
          </Grid>
          <Grid item xs={9} className={styles.gridDetail}>
            <Typography variant="subtitle1">Class</Typography>
            <Typography variant="h3">{data?.class.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <FitnessCenter className={styles.icon} />
          </Grid>
          <Grid item xs={9} className={styles.gridDetail}>
            <Typography variant="subtitle1">Clubs</Typography>
            <Typography variant="h3">{data?.class.gym_name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <AccessTime className={styles.icon} />
          </Grid>
          <Grid item xs={9} className={styles.gridDetail}>
            <Typography variant="subtitle1">Schedule</Typography>
            <Typography variant="h3">
              {data?.class.schedules[0].time_schedule}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h3" style={{ marginTop: "1rem" }}>
          Payment Summary
        </Typography>
        <Box className={styles.paymentDetail}>
          <Typography variant="subtitle2">Subtotal</Typography>
          <Typography variant="body2">Rp. {data?.amount}</Typography>
        </Box>
        <hr />
        <Box className={styles.paymentDetail}>
          <Typography variant="subtitle2">Total</Typography>
          <Typography variant="body2">Rp. {data?.amount}</Typography>
        </Box>
        <Button variant="contained" className={styles.uploadPayment}>
          Upload payment receipt
        </Button>
      </Box>
    </>
  );
}
