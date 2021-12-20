import { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { VisibilityOff, Visibility, Google } from "@mui/icons-material";
import Head from "next/head";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    display: "flow-root",
    minHeight: "100vh",
    maxWidth: "576px",
    margin: "10px auto",
    padding: "40px 20px",
    border: "1px solid black",
    textAlign: "center",
  },
  textField: {
    margin: "20px 0",
    width: "100%",
    "& label.Mui-focused": {
      color: "#6200EE",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#6200EE",
      },
    },
  },
  loginForm: {
    margin: "0 10%",
  },
  waveContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundImage: `url("/login_page.jpg")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  waveImg: {
    position: "absolute",
    bottom: "0",
    left: "0",
    overflow: "hidden",
    lineHeight: "0",
    transform: "rotate(180deg)",
    "& svg": {
      position: "relative",
      display: "block",
      width: "calc(157% + 1.3px)",
      height: "76px",
    },
    "& path": {
      fill: "#ffffff",
    },
  },
  button: {
    backgroundColor: "black",
    color: "white",
    width: "100%",
  },
  logo: {
    width: "301px",
    height: "71px",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <div className={classes.root}>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={classes.waveContainer}>
        <img
          src="/calfit-logo.pnadg"
          className={classes.logo}
          alt="CalFit Logo"
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
      <div className={classes.loginForm}>
        <h1>Login</h1>
        <TextField
          className={classes.textField}
          label="Username"
          type="text"
        ></TextField>
        <TextField
          className={classes.textField}
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button variant="contained" className={classes.button}>
          Login
        </Button>
        <h3>Or</h3>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<Google />}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
}
