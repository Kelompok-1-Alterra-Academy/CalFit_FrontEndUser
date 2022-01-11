import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: "#111D2C85",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  topBar: {
    display: 'flex',
    margin: '0 20px',
    height: '64px',
    width: '576px',
    alignItems: 'center',
    justifyContent: 'start',
  },
  pageTitle: {
    color: "#fff",
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    textAlign: 'left',
  },
  arrowBackIcon: {
    color: "#fff",
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    cursor: 'pointer',
  },
}));

export const TopBar = ({ label }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.topBar}>
        <Button onClick={() => router.back()}
          style={{
            margin: '0 0 0 12px',
            padding: '0',
          }}>
          <ArrowBackIcon className={classes.arrowBackIcon} />
        </Button>
        <Typography className={classes.pageTitle}>{label ? label : 'CalFit'}</Typography>
      </Box>
    </Box>
  );
};

TopBar.propTypes = {};
