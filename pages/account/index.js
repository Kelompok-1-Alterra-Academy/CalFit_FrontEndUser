import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useStyles } from "../../styles/Account.styles";
import dummyPP from "../../public/dummy-pp.png";
import { parseCookies } from "nookies";
import jwtDecode from "../../src/utils/jwtDecode/jwtDecode";
import { useEffect, useState } from "react";

export default function Account() {
  const classes = useStyles();
  const { token } = parseCookies();
  const [userdata, setUserdata] = useState();
  useEffect(() => {
    token && setUserdata(jwtDecode());
  }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={classes.userCard}>
        {userdata && (
          <>
            <Image src={dummyPP} width={92} height={92} alt="Profile Picture" />
            <Box className={classes.userInfo}>
              <h3 className={classes.userInfoUsername}>Username</h3>
              <h5 className={classes.userInfoEmail}>Email</h5>
              <h4 className={classes.userInfoMembership}>Membership Type</h4>
            </Box>
            <CreateIcon className={classes.createIcon} />
          </>
        )}
      </Box>

      <main className={classes.main}>
        {!userdata ? (
          <Link href="/login" passHref>
            <Box className={classes.menuList}>
              <div className={classes.newsdetail}>Login Account</div>
              <ArrowCircleRightIcon />
            </Box>
          </Link>
        ) : (
          <>
            <Link href="/account/bookings" passHref>
              <Box className={classes.menuList}>
                <div className={classes.newsdetail}>My Bookings</div>
                <ArrowCircleRightIcon />
              </Box>
            </Link>
            <Link href="/account/payments" passHref>
              <Box className={classes.menuList}>
                <div className={classes.newsdetail}>Payment Method</div>
                <ArrowCircleRightIcon />
              </Box>
            </Link>
            <Link href="/account/address" passHref>
              <Box className={classes.menuList}>
                <div className={classes.newsdetail}>Saved Address</div>
                <ArrowCircleRightIcon />
              </Box>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
