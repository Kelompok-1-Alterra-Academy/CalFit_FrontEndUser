import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./CardStyles";

export default function ClubsCard() {
  const styles = useStyles();
  return (
    <Card sx={{ maxWidth: 220, maxHeight: 220 }}>
      <CardActionArea>
        <div>
          <div className={styles.darkFilter} />
          <CardMedia
            component="img"
            height="220"
            image="/clubs-example.png"
            alt="Gelud Gym"
          />
        </div>
        <CardContent className={styles.cardContent}>
          <Typography variant="subtitle3">MON-SUN, 07.00 - 21.30</Typography>
          <Typography variant="h3" component="div">
            Gelud Gym
          </Typography>
          <Typography variant="body3">
            Jalan Kusuma No.9 Grogol Petamburan
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
