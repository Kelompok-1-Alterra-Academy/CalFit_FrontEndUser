import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./CardStyles";

export default function ClassesCard({ content }) {
  const styles = useStyles();

  return (
    <Card sx={{ maxWidth: 220, maxHeight: 220 }}>
      <CardActionArea>
        <div>
          <div className={styles.darkFilter} />
          <CardMedia
            component="img"
            height="220"
            image={content?.card_picture_url}
            alt={content?.name}
          />
        </div>
        <CardContent className={styles.cardContent}>
          <Typography variant="subtitle3">{content?.category}</Typography>
          <Typography variant="h3" component="div">
            {content?.name}
          </Typography>
          {/* <Typography variant="body3">60 mins</Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
