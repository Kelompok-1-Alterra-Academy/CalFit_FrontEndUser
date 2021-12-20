import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    display: "flex",
    zIndex: theme.zIndex.appBar,
    margin: "0 auto",
    backgroundColor: theme.palette.background.dark,
    opacity: 0.85,
    backdropFilter: "blur(9px) !important",
    WebkitBackdropFilter: "blur(9px) !important",
  },
  container: {
    padding: "0 2rem",
    backgroundColor: "#111d2c",
    color: "#fefefe",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "#fefefe",
    marginTop: "50px",
    // height: "256px",
    fontSize: "20px",
  },
  userCard: {
    display: "flex",
    flexDirection: "row",
    // height: "92px",
    justifyContent: "space-between",
    color: "#fefefe",
    marginBottom: "20px",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0 auto",
  },
  userInfoUsername: {
    margin: "0 !important",
    fontSize: "1.3rem !important",
  },
  userInfoEmail: {
    margin: "0",
    fontWeight: "normal",
  },
  userInfoMembership: {
    margin: "0",
  },
  createIcon: {
    margin: "auto !important",
    marginRight: "0 !important",
    color: "#fefefe",
  },
  menuList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "16px auto",
    width: "100%",
  }
}));
