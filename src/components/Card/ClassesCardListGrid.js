import * as React from 'react';
import Image from "next/image";
import { Grid } from "@mui/material";
import { useStyles } from "./ClassesCardGridListStyles";
import ClassesCard from "./ClassesCard";
import { getAllClasses } from '../../utils/fetchApi/classes';
import loadingSVG from "../../../public/ripple-loading.svg";

export default function ClassesCardListGrid() {
  const styles = useStyles();
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllClasses(setLoading, setClasses, {limit: 100, page: 1});
  }, []);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <div className={styles.loading}>
          <Image src={loadingSVG} width={200} height={200} alt="loading"/>
        </div>
      ): (
        classes.map((c) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={c.id}>
            <ClassesCard content={c} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
