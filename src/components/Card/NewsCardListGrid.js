import * as React from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { useStyles } from "./NewsCardGridListStyles";
import NewsCard from "./NewsCard";
import { getAllNewsletters } from "../../utils/fetchApi/newsletters";
import loadingSVG from "../../../public/ripple-loading.svg";

export default function NewsCardListGrid({ filter }) {
  const styles = useStyles();
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllNewsletters(setLoading, setNews, { limit: 100, page: 1, filter });
  }, [filter]);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <div className={styles.loading}>
          <Image src={loadingSVG} width={200} height={200} alt="loading" />
        </div>
      ) : (
        news.map((c) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={c.id}>
            <NewsCard content={c} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
