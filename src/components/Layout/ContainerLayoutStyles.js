import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flow-root",
    minHeight: "100vh",
    maxWidth: "576px",
    margin: "auto",
    padding: "40px 20px",
  },
}));
