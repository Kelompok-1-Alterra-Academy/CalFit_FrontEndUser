import { useState, useEffect } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { useStyles } from "./ClubsCardGridStyles";
import ClubsCard from "./ClubsCard";
import { getAllGyms } from "../../utils/fetchApi/clubs";
import loadingSVG from '../../../public/ripple-loading.svg';

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
        <div className={styles.loading}>
          <Image src={loadingSVG} width={200} height={200} alt='loading' />
        </div>
      ) : (
        gyms.map((gym) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={gym.id}>
            <ClubsCard club={gym} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
