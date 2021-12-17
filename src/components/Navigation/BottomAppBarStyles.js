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
    backdropFilter: "blur(9px)",
    WebkitBackdropFilter: "blur(9px)",
  },
  bottomNavigation: {
    margin: "auto",
    width: 576,
    minWidth: 320,
    height: 65,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.dark,
    backdropFilter: "blur(9px)",
    WebkitBackdropFilter: "blur(9px)",
  },
  bottomNavigationAction: {
    backdropFilter: "blur(9px)",
    WebkitBackdropFilter: "blur(9px)",
    color: theme.palette.secondary.main,
  },
}));
