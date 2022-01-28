import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  InputLabel,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TopBar } from "../../../src/components/Navigation/TopBar";
import styles from "../../../styles/account/edit/Index.module.css";
import { passwordValidation } from "../../../src/utils/validation/validation";
import { parseCookies } from "nookies";
import { getUserByID, updateUser } from "../../../src/utils/fetchApi/users";
import jwtDecode from "../../../src/utils/jwtDecode/jwtDecode";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../src/store/AlertReducers";
import { CustomAlert } from "../../../src/components/Alert/Alert";
import { useRouter } from "next/router";
import { cloudinaryUploadApi } from "../../../src/utils/fetchApi/api";

export default function EditAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [data, setData] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [error, setError] = useState({
    fullname: {
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
    photo: {
      status: false,
      message: "",
    },
  });
  const { token } = parseCookies();
  const alert = useSelector((state) => state.alert.alertContent);

  useEffect(() => {
    if (token) {
      const { Id } = jwtDecode();
      getUserByID(token, setData, Id);
    }
  }, [token]);

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
      case "fullname":
        setData({ ...data, fullname: e.target.value });
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
        fullname: data?.fullname,
        password: data?.password,
        photo: photoURL,
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

  const handleChangePhoto = async (e) => {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 5000000) {
      setError({
        ...error,
        photo: {
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
        photo: {
          status: true,
          message: "picture must be a jpeg, jpg, or png",
        },
      });
      return;
    }
    await cloudinaryUploadApi(e.target.files[0], setPhotoURL);
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
        <Box component="form" onSubmit={(e) => handleOnSubmit(e)}>
          <Typography variant="h1" sx={{ marginBottom: "3%" }}>
            Edit Account
          </Typography>
          <Box
            component="div"
            style={{ display: "block", textAlign: "center" }}
          >
            <Image
              src={
                data?.photo
                  ? data.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              width={92}
              height={92}
              alt="Profile Picture"
            />
          </Box>
          <InputLabel id="card-label" style={{ color: "white" }}>
            Card Picture
          </InputLabel>
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
            labelId="card-label"
            style={{ marginTop: 0 }}
            type="file"
            name="photo"
            onChange={(e) => handleChangePhoto(e)}
            error={error.photo.status}
            helperText={error.photo.message}
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
            label="Fullname"
            key={data?.fullname ? "notLoadedYet" : "loaded"}
            defaultValue={data?.fullname}
            name="fullname"
            path="text"
            onChange={(e) => handleOnChange(e)}
            error={error.fullname.status}
            helperText={error.fullname.message}
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
