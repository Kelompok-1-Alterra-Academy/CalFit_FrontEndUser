import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function MyBookingsCard({ data }) {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data?.class.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data?.class.gym_name}
          </Typography>
          <Typography variant="body2">
            {data?.class.schedules[0].time_schedule}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
