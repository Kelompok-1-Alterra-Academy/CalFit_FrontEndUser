import { useStyles } from "./MyBookingCardStyles";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";

export default function MyBookingsCard({ data }) {
  const styles = useStyles();
  return (
    <Card className={styles.card} sx={{ minWidth: 275 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardMedia
            component="img"
            className={styles.cardMedia}
            image={data?.class.card_picture_url}
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Typography variant="h3" component="div">
              {data?.class.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{data?.class.gym_name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.class.schedules[0].time_schedule}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
