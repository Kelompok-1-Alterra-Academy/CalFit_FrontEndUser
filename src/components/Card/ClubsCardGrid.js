import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useStyles } from "./CardStyles";
import ClubsCard from "./ClubsCard";
import { getAllGyms } from "../../utils/fetchApi/clubs";

export default function ClubsCardGrid() {
  const styles = useStyles();
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGyms(setLoading, setGyms, { limit: 100, page: 1 });
  }, []);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        gyms.map((gym) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={gym.id}>
            <ClubsCard slide={gym} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
