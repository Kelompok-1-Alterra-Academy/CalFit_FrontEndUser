import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./CardStyles";

export default function ClubsCard({ slide }) {
  const styles = useStyles();

  console.log(slide);

  return (
    <Card sx={{ maxWidth: 220, maxHeight: 220 }}>
      <CardActionArea>
        <div>
          <div className={styles.darkFilter} />
          <CardMedia
            component="img"
            height="220"
            image={slide.picture}
            alt={slide.name}
          />
        </div>
        <CardContent className={styles.cardContent}>
          {/* <Typography variant="subtitle3">MON-SUN, 07.00 - 21.30</Typography> */}
          <Typography variant="h3" component="div">
            {slide.name}
          </Typography>
          <Typography variant="body3">
            {`${slide.address.address}, ${slide.address.district}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
