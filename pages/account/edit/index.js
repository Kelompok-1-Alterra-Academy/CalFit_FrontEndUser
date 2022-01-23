import Head from "next/head";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TopBar } from "../../../src/components/navigation/TopBar";
import styles from "../../../styles/account/edit/Index.module.css";
import { passwordValidation } from "../../../src/utils/validation/validation";

export default function EditAccount() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: {
      status: false,
      message: "",
    },
    password: {
      status: false,
      message: "",
    },
    confirmPassword: {
      status: false,
      message: "",
    },
  });

  const handleClickShowPassword = (type) => {
    switch (type) {
      case "password":
        setShowPassword({ ...showPassword, password: !showPassword.password });
        break;
      case "confirmPassword":
        setShowPassword({
          ...showPassword,
          confirmPassword: !showPassword.confirmPassword,
        });
        break;
    }
  };
  const handleOnChange = (e) => {
    switch (e.target.name) {
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
        break;
      case "confirmPassword":
        setData({ ...data, confirmPassword: e.target.value });
        passwordValidation(e.target.value)
          ? setError({
              ...error,
              confirmPassword: { status: false, message: "" },
            })
          : setError({
              ...error,
              confirmPassword: {
                status: true,
                message:
                  "password must be at least 6 char contain number, lowercase and uppercase letter",
              },
            });
        if (data.confirmPassword === data.password) {
          setError({
            ...error,
            confirmPassword: {
              status: true,
              message: "password not match",
            },
          });
        }
        break;
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Edit My Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar label="Edit Account"></TopBar>
      <main className={styles.main}>
        <Box component="form" className={styles.loginForm}>
          <Typography variant="h1">Edit Account</Typography>
          <TextField
            sx={{
              margin: "2% 0",
              width: "100%",
              "& label.MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
              },
            }}
            label="Username"
            name="username"
            path="text"
            onChange={(e) => handleOnChange(e)}
            error={error.username.status}
            helperText={error.username.message}
          ></TextField>
          <TextField
            sx={{
              margin: "2% 0",
              width: "100%",
              "& label.MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
              },
            }}
            label="Password"
            name="password"
            value={data.password}
            type={showPassword.password ? "text" : "password"}
            onChange={(e) => handleOnChange(e)}
            error={error.password.status}
            helperText={error.password.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("password")}
                    style={{ color: "white" }}
                  >
                    {showPassword.password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>

          {/* Confirm password */}
          <TextField
            sx={{
              margin: "2% 0",
              width: "100%",
              "& label.MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
              },
            }}
            label="Confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            type={showPassword.confirmPassword ? "text" : "password"}
            onChange={(e) => handleOnChange(e)}
            error={error.confirmPassword.status}
            helperText={error.confirmPassword.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    style={{ color: "white" }}
                  >
                    {showPassword.confirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
      </main>
    </div>
  );
}
