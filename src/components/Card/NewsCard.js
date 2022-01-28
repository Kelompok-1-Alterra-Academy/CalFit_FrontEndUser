import * as React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useStyles } from "./NewsCardStyles";

export default function NewsCard({ content }) {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 410, maxHeight: 220 }}>
      <CardActionArea onClick={() => router.push(`/newsletters/${content.id}`)}>
        <div>
          <div className={styles.darkFilter} />
          <CardMedia
            component="img"
            height="250"
            image={content?.url_picture}
            alt={content?.title}
          />
        </div>
        <CardContent className={styles.cardContent}>
          <Typography variant="h3">{content?.title}</Typography>
          <Typography variant="subtitle3" component="div">
            {content?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
