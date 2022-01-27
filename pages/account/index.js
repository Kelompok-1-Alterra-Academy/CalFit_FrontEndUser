import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useStyles } from "../../styles/Account.styles";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByID } from "../../src/utils/fetchApi/users";
import jwtDecode from "../../src/utils/jwtDecode/jwtDecode";
import { signOut } from "next-auth/react";

export default function Account() {
  const router = useRouter();
  const classes = useStyles();
  const { token } = parseCookies();
  const [userdata, setUserdata] = useState();

  useEffect(() => {
    if (token) {
      const { Id } = jwtDecode();
      getUserByID(token, setUserdata, Id);
    }
  }, [token]);

  const handleOnClick = () => router.push("/account/edit");

  return (
    <div className={classes.container}>
      <Head>
        <title>Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={classes.userCard}>
        {userdata && (
          <>
            <Image
              src={
                userdata.photo
                  ? userdata.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              width={92}
              height={92}
              alt="Profile Picture"
            />

            <Box className={classes.userInfo}>
              <h3 className={classes.userInfoUsername}>{userdata?.fullname}</h3>
              <h5 className={classes.userInfoEmail}>{userdata?.email}</h5>
              <h4 className={classes.userInfoMembership}>
                {userdata?.membership_name}
              </h4>
            </Box>
            <CreateIcon
              className={classes.createIcon}
              onClick={() => handleOnClick()}
            />
          </>
        )}
      </Box>

      <main className={classes.main}>
        {!token ? (
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
            <Box
              component="div"
              className={classes.menuList}
              onClick={() => {
                destroyCookie(null, "token");
                setTimeout(() => {
                  signOut({
                    callbackUrl: `${process.env.NEXTAUTH_URL}`,
                  });
                }, 500);
              }}
            >
              <div className={classes.newsdetail}>Logout</div>
              <ArrowCircleRightIcon />
            </Box>
          </>
        )}
      </main>
    </div>
  );
}
