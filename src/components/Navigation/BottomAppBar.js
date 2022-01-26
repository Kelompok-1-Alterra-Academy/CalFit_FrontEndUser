import React, { useState, useEffect } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/dist/client/router";
import { useStyles } from "./BottomAppBarStyles";

const routeIndex = [
  { selected: ["/"], path: "/", label: "Home", icon: <HomeIcon />, index: 1 },
  {
    selected: ["/news"],
    path: "/news",
    label: "News",
    icon: <NewspaperIcon />,
    index: 2,
  },
  {
    selected: ["/classes"],
    path: "/classes",
    label: "Classes",
    icon: <OndemandVideoIcon />,
    index: 3,
  },
  {
    selected: ["/account"],
    path: "/account",
    label: "Account",
    icon: <PersonIcon />,
    index: 4,
  },
];

export const BottomAppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useState(
    routeIndex.findIndex((route) => route.selected.includes(router.pathname)) +
      1
  );

  useEffect(() => {
    const currentRoute = routeIndex.find((route) =>
      route.selected.includes(router.pathname)
    );
    setValue(currentRoute ? currentRoute.index : 0);
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(routeIndex[newValue - 1].path);
  };

  return (
    <Box className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.bottomNavigation}
      >
        {routeIndex.map((route) => (
          <BottomNavigationAction
            key={route.label}
            label={route.label}
            value={route.index}
            icon={route.icon}
            className={classes.bottomNavigationAction}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

BottomAppBar.propTypes = {};
