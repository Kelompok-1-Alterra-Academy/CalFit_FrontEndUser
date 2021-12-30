import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    display: "flow-root",
    minHeight: "100vh",
    maxWidth: "576px",
    margin: "auto",
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
    margin: "30px 10%",
  },
  waveContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundImage: `url("/login_page.jpg")`,
    backgroundRepeat: "no-repeat",
    minHeight: "576px",
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
  link: {
    color: theme.palette.secondary,
    textDecoration: "none",
    cursor: "pointer",
  },
}));
