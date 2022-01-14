import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import useStyles from "./TopBarStyles";

export const TopBar = ({ label }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.topBar}>
        <Button onClick={() => router.back()}>
          <ArrowBackIcon className={classes.arrowBackIcon} />
        </Button>
        <Typography className={classes.pageTitle}>
          {label ? label : "CalFit"}
        </Typography>
      </Box>
    </Box>
  );
};

TopBar.propTypes = {
  label: PropTypes.string,
};
