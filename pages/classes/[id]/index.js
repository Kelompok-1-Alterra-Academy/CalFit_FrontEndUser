import { Button, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../../src/components/Dialog/Dialog";
import { TopBar } from "../../../src/components/navigation/TopBar";
import Loading from "../../../src/components/page/Loading";
import { getClassById } from "../../../src/utils/fetchApi/classes";
import jwtDecode from "../../../src/utils/jwtDecode/jwtDecode";
import styles from "../../../styles/classes/[id]/Index.module.css";
import { showAlert } from "../../../src/store/AlertReducers";
import { CustomAlert } from "../../../src/components/Alert/Alert";

export default function ClassDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alertContent);
  const [classes, setClasses] = useState();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false });
  const [bookingData, setBookingData] = useState();

  useEffect(() => {
    const id = router.query.id;
    if (id) getClassById(setLoading, setClasses, id);
    return () => {
      setClasses({});
      setLoading({});
    };
  }, [router.query.id]);

  const handleOnClick = () => {
    const { token } = parseCookies();
    if (!token) {
      dispatch(
        showAlert({
          alertContent: {
            message: "Please login to continue",
            status: true,
          },
        })
      );
    } else {
      const { Id } = jwtDecode(token);
      setBookingData({
        amount: classes.price,
        user_id: Id,
        class_id: classes.id,
      });
      setDialog({
        isOpen: true,
      });
    }
  };

  return loading || !classes ? (
    <Loading></Loading>
  ) : (
    <div>
      <Head>
        <title>{classes.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar label={"Home"} />
      {alert.status && <CustomAlert data={alert} />}

      <div
        className={styles.bghome}
        style={{ backgroundImage: `url(${classes?.banner_picture_url})` }}
      ></div>

      <main className={styles.main}>
        <div className={styles.classheader}>
          <h3>{classes?.name}</h3>
          <h3>Rp. {classes?.price}</h3>
          <h3>{classes?.gym_name}</h3>
        </div>
        <h5>{classes?.schedules[0].time_schedule}</h5>
        <Typography className={styles.description}>
          {classes?.description}
        </Typography>
        <Button
          variant="contained"
          className={styles.button}
          onClick={handleOnClick}
        >
          Booking Now
        </Button>
        {dialog.isOpen && (
          <CustomDialog
            setDialog={setDialog}
            setLoading={setLoading}
            type="payment"
            data={bookingData}
          />
        )}
      </main>
    </div>
  );
}
