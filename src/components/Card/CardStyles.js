import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    darkFilter: {
        backgroundColor: theme.palette.background.dark,
        zIndex: 2,
        opacity: 0.25,
    },
    cardContent: {
        marginTop: "-100px",
        color: "white",
    }
}));
