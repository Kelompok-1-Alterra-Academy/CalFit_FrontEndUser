import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useStyles } from "../../styles/Account.styles";
import dummyPP from "../../public/dummy-pp.png";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showAlert } from "../../src/store/AlertReducers";
import { useEffect, useState } from "react";
import { getUserByID } from "../../src/utils/fetchApi/users";
import jwtDecode from "../../src/utils/jwtDecode/jwtDecode";

export default function Account() {
  const router = useRouter();
  const dispatch = useDispatch();
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
        {token && (
          <>
            <Image src={dummyPP} width={92} height={92} alt="Profile Picture" />
            <Box className={classes.userInfo}>
              <h3 className={classes.userInfoUsername}>{userdata?.username}</h3>
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
                router.push("/");
                setTimeout(
                  () =>
                    dispatch(
                      showAlert({
                        alertContent: {
                          message: `Logout Succesfull`,
                          status: true,
                        },
                      })
                    ),
                  500
                );
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
