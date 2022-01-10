import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./CardStyles";

export default function ClubsCard({ club }) {
  const styles = useStyles();

  return (
    <Card sx={{ maxWidth: 220, maxHeight: 220 }}>
      <CardActionArea>
        <div>
          <div className={styles.darkFilter} />
          <CardMedia
            component="img"
            height="220"
            image={club?.picture}
            alt={club?.name}
          />
        </div>
        <CardContent className={styles.cardContent}>
          {/* <Typography variant="subtitle3">MON-SUN, 07.00 - 21.30</Typography> */}
          <Typography variant="h3" component="div">
            {club?.name}
          </Typography>
          <Typography variant="body3">
            {`${club?.address?.address}, ${club?.address?.district}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
