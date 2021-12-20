import * as React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';


export default function ClassesCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image="/public/classes-example.png"
          alt="Gelud Gym"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                DANCE
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                Zumba
            </Typography>
            <Typography variant="body2" color="text.secondary">
                60 mins
            </Typography>
            {/* <Typography className={styles.clubtime} variant="body2" color="text.secondary">
                DANCE
            </Typography>
            <Typography className={styles.clubname} gutterBottom variant="h5" component="div">
                Zumba
            </Typography>
            <Typography className={styles.clubloc} variant="body2" color="text.secondary">
                60 mins
            </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}