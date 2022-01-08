import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./CardStyles";

export default function ClassesCard({ slide }) {
  const styles = useStyles();
  console.log(slide)
  return (
    <Card sx={{ maxWidth: 220, maxHeight: 220 }}>
      <CardActionArea>
        <div>
          <div className={styles.darkFilter} />
          <CardMedia
            component="img"
            height="220"
            image={slide.card_picture_url}
            alt={slide.name}
          />
        </div>
        <CardContent className={styles.cardContent}>
          <Typography variant="subtitle3">{slide.category}</Typography>
          <Typography variant="h3" component="div">
            {slide.name}
          </Typography>
          {/* <Typography variant="body3">60 mins</Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
