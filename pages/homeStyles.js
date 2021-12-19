import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
  },
  bghome: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "auto",
    zIndex: 0,
  },
  header: {
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    
  },
  div1:{
    padding: "200px 25px 60px"
  },
  subsbutton: {
    display: "flex",
    alignItems: "center",
  },
  footer: {
    display: "flex",
    flex: 1,
    padding: "2rem 0",
    borderTop: "1px solid #eaeaea",
    justifyContent: "center",
    alignItems: "center",
    a: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    }
  }
}));