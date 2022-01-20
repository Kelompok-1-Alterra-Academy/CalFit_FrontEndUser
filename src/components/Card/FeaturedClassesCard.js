import * as React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./CardStyles";

export default function FeaturedClassesCard({ content }) {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 360, maxHeight: 360 }}>
      <CardActionArea onClick={() => router.push(`/classes/${content.id}`)}>
        <div>
          <CardMedia
            component="img"
            height="360"
            image={content?.banner_picture_url}
            alt={content?.name}
          />
        </div>
        <CardContent className={styles.cardContent}>
            <Typography variant="h3" component="div">
                {content?.name}
            </Typography>
            <Typography variant="subtitle4">{content?.description}</Typography>
            {/* <Typography variant="body3">60 mins</Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
