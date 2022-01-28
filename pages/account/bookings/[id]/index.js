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
  TextField,
} from "@mui/material";
import { OndemandVideo, FitnessCenter, AccessTime } from "@mui/icons-material";
import { TopBar } from "../../../../src/components/Navigation/TopBar";
import styles from "../../../../styles/account/bookings/[id]/Index.module.css";
import {
  getBookingsByID,
  updateBooking,
} from "../../../../src/utils/fetchApi/classes";
import { cloudinaryUploadApi } from "../../../../src/utils/fetchApi/api";
export default function BookingDetails() {
  const route = useRouter();
  const [data, setData] = useState();
  const [open, setOpen] = useState();
  const [invoice, setInvoice] = useState();
  const [error, setError] = useState({
    invoice: {
      status: false,
      message: "",
    },
  });
  const id = route.query.id;

  useEffect(() => {
    getBookingsByID(setData, id);
  }, [id]);

  const handleInvoice = async (e) => {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 5000000) {
      setError({
        invoice: {
          status: true,
          message: "picture size must be less than 5MB",
        },
      });
      return;
    }
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpg"
    ) {
      setError({
        ...error,
        invoice: {
          status: true,
          message: "picture must be a jpeg, jpg, or png",
        },
      });
      return;
    }
    const url = await cloudinaryUploadApi(e.target.files[0], setInvoice);
    await updateBooking(invoice, id);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleOnClick = (type) => {
    switch (type) {
      case "viewLink":
        setOpen({
          status: true,
          title: "Link Classes",
          content: <a href={data?.class.link}>{data?.class.link}</a>,
        });
        break;
      case "uploadPayment":
        setOpen({
          status: true,
          title: "Upload Payment",
          content: (
            <>
              <TextField
                sx={{
                  margin: "2% 0",
                  width: "100%",
                }}
                style={{ marginTop: 0 }}
                type="file"
                name="invoice"
                onChange={(e) => handleInvoice(e)}
                error={error.invoice.status}
                helperText={error.invoice.message}
              ></TextField>
            </>
          ),
        });
        break;
    }
  };

  const handleClose = () => {
    setOpen({ status: false });
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
        <Card className={styles.bookingStatusBox} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h3" className={styles.typography}>
              {data?.status !== "waiting"
                ? "Congratulations!"
                : "Please make payment via the following method "}
            </Typography>
            <Typography variant="body1" className={styles.typography}>
              {data?.status !== "waiting"
                ? "Your class are succesfully booked!"
                : "BCA: 12345 a/n Calfit"}
            </Typography>
            {data?.status !== "waiting" && (
              <Typography sx={{ mb: 1.5 }} className={styles.typography}>
                Booked on: {data?.created_at}
              </Typography>
            )}
          </CardContent>
        </Card>
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
        {data?.status === "waiting" ? (
          <Button
            variant="contained"
            className={styles.uploadPayment}
            onClick={() => handleOnClick("uploadPayment")}
          >
            Upload payment receipt
          </Button>
        ) : (
          data?.class.link !== undefined && (
            <Button
              variant="contained"
              className={styles.viewLink}
              onClick={() => {
                handleOnClick("viewLink");
              }}
            >
              View link class
            </Button>
          )
        )}
        {open && (
          <Dialog
            open={open.status}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{open.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {open.content}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
}
