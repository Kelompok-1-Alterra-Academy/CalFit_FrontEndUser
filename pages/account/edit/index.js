import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TopBar } from "../../../src/components/navigation/TopBar";
import styles from "../../../styles/account/edit/Index.module.css";
import { passwordValidation } from "../../../src/utils/validation/validation";
import { parseCookies } from "nookies";
import {
  getUserByUsername,
  updateUser,
} from "../../../src/utils/fetchApi/users";
import jwtDecode from "../../../src/utils/jwtDecode/jwtDecode";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../src/store/AlertReducers";
import { CustomAlert } from "../../../src/components/Alert/Alert";
import { useRouter } from "next/router";

export default function EditAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [data, setData] = useState();
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
  const { token } = parseCookies();
  const alert = useSelector((state) => state.alert.alertContent);

  useEffect(() => {
    if (token) {
      const { Email } = jwtDecode();
      getUserByUsername(token, setData, Email);
    }
  }, []);

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
      case "username":
        setData({ ...data, username: e.target.value });
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
        break;
      case "confirmPassword":
        setData({ ...data, confirmPassword: e.target.value });
        break;
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data?.password !== data?.confirmPassword) {
      setError({
        ...error,
        confirmPassword: {
          status: true,
          message: "password not match",
        },
      });
    } else {
      setError({
        ...error,
        confirmPassword: {
          status: false,
        },
      });
      const newData = {
        email: data?.email,
        username: data?.username,
        password: data?.password,
      };
      try {
        const res = await updateUser(token, newData);
        if (res.status === 200) {
          dispatch(
            showAlert({
              alertContent: {
                status: true,
                message: "success edit data",
              },
            })
          );
          setTimeout(() => {
            dispatch(
              showAlert({
                alertContent: {
                  status: false,
                },
              })
            );
            router.push("/account");
          }, 2000);
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
        setTimeout(() => {
          dispatch(
            showAlert({
              alertContent: {
                status: false,
              },
            })
          );
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit My Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar label="Edit Account"></TopBar>
      {alert.status && <CustomAlert data={alert} />}
      <main className={styles.main}>
        <Box
          component="form"
          className={styles.loginForm}
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <Typography variant="h1" sx={{ marginBottom: "3%" }}>
            Edit Account
          </Typography>
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
            key={data?.username ? "notLoadedYet" : "loaded"}
            defaultValue={data?.username}
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
            value={data?.password}
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
            value={data?.confirmPassword}
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
          <Button
            variant="contained"
            type="submit"
            style={{ display: "block", margin: "auto", color: "white" }}
          >
            Save Changes
          </Button>
        </Box>
      </main>
    </div>
  );
}
