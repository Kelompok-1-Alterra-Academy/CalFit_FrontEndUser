import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Link as MaterialLink,
} from "@mui/material";
import { VisibilityOff, Visibility, Google } from "@mui/icons-material";
import { CustomAlert } from "../../../src/components/Alert/Alert";
import { useStyles } from "./Auth.style";
import auth from "../../utils/fetchApi/auth";
import {
  emailValidation,
  passwordValidation,
} from "../../utils/validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../store/AlertReducers";
import { setUserdata } from "../../store/UsersReducer";
import { setCookie } from "nookies";
import jwtDecode from "../../utils/jwtDecode/jwtDecode";

export default function AuthForm({ path }) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: {
      status: false,
      message: "",
    },
    password: {
      status: false,
      message: "",
    },
  });
  const alert = useSelector((state) => state.alert.alertContent);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "email":
        setData({ ...data, email: e.target.value });
        emailValidation(e.target.value)
          ? setError({ ...error, email: { status: false, message: "" } })
          : setError({
              ...error,
              email: { status: true, message: "wrong email format" },
            });
        break;
      case "password":
        setData({ ...data, password: e.target.value });
        passwordValidation(e.target.value)
          ? setError({ ...error, password: { status: false, message: "" } })
          : setError({
              ...error,
              password: {
                status: true,
                message:
                  "password must be at least 6 char contain number, lowercase and uppercase letter",
              },
            });
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password == "") {
      dispatch(
        showAlert({
          alertContent: {
            message: "please fill all fields",
            status: true,
          },
        })
      );
    } else {
      try {
        const res = await auth(path.toLowerCase(), data);
        setCookie(null, "token", res.data.token);
        const { Email } = jwtDecode();
        setData({ ...data, password: "" });
        switch (res.status) {
          case 201:
            dispatch(
              showAlert({
                alertContent: {
                  message: "Please login to continue",
                  status: true,
                },
              })
            );
            router.push("/login");
            break;
          case 200:
            dispatch(
              setUserdata({
                userdata: res.data,
              })
            );
            router.push("/");
            setTimeout(() => {
              dispatch(
                showAlert({
                  alertContent: {
                    message: `Welcome ${Email}`,
                    status: true,
                  },
                })
              );
            }, 500);
            break;
          default:
            break;
        }
      } catch (error) {
        dispatch(
          showAlert({
            alertContent: {
              message: error.message,
              status: true,
            },
          })
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      {alert.status && <CustomAlert data={alert} />}
      <Head>
        <title>{path} page</title>
      </Head>
      <div className={classes.waveContainer}>
        <Image
          src="/calfit-logo.png"
          alt="CalFit Logo"
          width={301}
          height={71}
        />
        <div className={classes.waveImg}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
      <Box
        component="form"
        className={classes.loginForm}
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <Typography variant="h1">{path}</Typography>
        <TextField
          className={classes.textField}
          label="Email"
          name="email"
          path="text"
          onChange={(e) => handleOnChange(e)}
          error={error.email.status}
          helperText={error.email.message}
        ></TextField>
        <TextField
          className={classes.textField}
          label="Password"
          name="password"
          value={data.password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleOnChange(e)}
          error={error.password.status}
          helperText={error.password.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button type="submit" variant="contained" className={classes.button}>
          {path}
        </Button>
        {path === "Register" ? (
          <>
            <h4>Already Have An Account?</h4>
            <Link href="/login">
              <Button variant="contained" className={classes.button}>
                Login
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h4>
              Dont have account?{" "}
              <Link href="/register">
                <MaterialLink variant="contained" className={classes.link}>
                  Register here
                </MaterialLink>
              </Link>
            </h4>
            <h3>Or</h3>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<Google />}
              onClick={() =>
                signIn("google", {
                  callbackUrl: process.env.NEXTAUTH_URL,
                })
              }
            >
              Login with Google
            </Button>
          </>
        )}
      </Box>
    </div>
  );
}
