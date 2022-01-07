import { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Head from "next/head";
import Image from "next/image";
import { useStyles } from "../../styles/Auth.style";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const classes = useStyles();
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
  const emailValidation = /\S+@\S+\.\S+/;
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "email":
        setData({ ...data, email: e.target.value });
        emailValidation.test(e.target.value)
          ? setError({ ...error, email: { status: false, message: "" } })
          : setError({
              ...error,
              email: { status: true, message: "wrong email format" },
            });
        break;
      case "password":
        setData({ ...data, password: e.target.value });
        passwordValidation.test(e.target.value)
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        email: data.email,
        password: data.password,
      })
      .then(() => {
        setData({ email: "", password: "" });
      })
      .catch((error) => {
        console.error(error.response.status);
      });
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>Register Page</title>
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
        <Typography variant="h1">Register</Typography>
        <TextField
          className={classes.textField}
          label="Email"
          name="email"
          type="text"
          onChange={(e) => handleOnChange(e)}
          error={error.email.status}
          helperText={error.email.message}
        ></TextField>
        <TextField
          className={classes.textField}
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleOnChange(e)}
          error={error.password.status}
          helperText={error.password.message}
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
        <Button type="submit" variant="contained" className={classes.button}>
          Register
        </Button>
        <h4>Already Have An Account?</h4>
        <Link href="/login">
          <Button variant="contained" className={classes.button}>
            Login
          </Button>
        </Link>
      </Box>
    </div>
  );
}
