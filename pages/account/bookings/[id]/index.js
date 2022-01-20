import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { OndemandVideo, FitnessCenter, AccessTime } from "@mui/icons-material";
import { TopBar } from "../../../../src/components/navigation/TopBar";
import styles from "../../../../styles/account/bookings/[id]/Index.module.css";
import { getBookingsByID } from "../../../../src/utils/fetchApi/classes";
export default function BookingDetails() {
  const route = useRouter();
  const [data, setData] = useState();
  const [open, setOpen] = useState();
  const id = route.query.id;

  useEffect(() => {
    getBookingsByID(setData, id);
  }, [id]);

  const handleOnClick = (type) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        {data?.status !== "waiting" && (
          <Card className={styles.bookingStatusBox} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h3" className={styles.typography}>
                Congratulations!
              </Typography>
              <Typography variant="body1" className={styles.typography}>
                Your class are succesfully booked
              </Typography>
              <Typography sx={{ mb: 1.5 }} className={styles.typography}>
                Booked on: {data?.created_at}
              </Typography>
            </CardContent>
          </Card>
        )}
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
        {data?.class.status !== "waiting" ? (
          <Button
            variant="contained"
            className={styles.viewLink}
            onClick={() => {
              handleOnClick("viewLink");
            }}
          >
            View link class
          </Button>
        ) : (
          <Button variant="contained" className={styles.uploadPayment}>
            Upload payment receipt
          </Button>
        )}
        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Link Classes"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <a href={data?.class.link}>{data?.class.name}</a>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
}
