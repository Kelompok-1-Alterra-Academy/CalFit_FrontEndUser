import * as React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';


export default function ClubsCard() {
  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image="/clubs-example.png"
          alt="Gelud Gym"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                MON-SUN, 07.00 - 21.30
            </Typography>
            <Typography variant="h2" component="div">
                Gelud Gym
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Jalan Kusuma No.9 Grogol Petamburan
            </Typography>
            {/* <Typography className={styles.clubtime} variant="body2" color="text.secondary">
                MON-SUN, 07.00 - 21.30
            </Typography>
            <Typography className={styles.clubname} gutterBottom variant="h5" component="div">
                Gelud Gym
            </Typography>
            <Typography className={styles.clubloc} variant="body2" color="text.secondary">
                Jalan Kusuma No.9 Grogol Petamburan
            </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}