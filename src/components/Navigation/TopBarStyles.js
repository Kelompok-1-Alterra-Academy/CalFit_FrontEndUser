import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: "#111D2C85",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  topBar: {
    display: "flex",
    margin: "0 20px",
    height: "64px",
    width: "576px",
    alignItems: "center",
    justifyContent: "start",
  },
  pageTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: theme.typography.h5.fontWeight,
    textAlign: "left",
  },
  arrowBackIcon: {
    color: "#fff",
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    cursor: "pointer",
  },
  arrowBackButton: {
    marginRight: "12px",
    padding: "0",
  },
}));

export default useStyles;
