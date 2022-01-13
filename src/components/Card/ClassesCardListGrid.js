import { Grid } from "@mui/material";
import { useStyles } from "./ClassesCardGridListStyles";
import ClassesCard from "./ClassesCard";

export default function ClassesCardListGrid({ classes }) {
  const styles = useStyles();

  return (
    <Grid container spacing={2}>
      {/* map the class */}
      {classes?.map((classItem) => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={classItem.id}>
          <ClassesCard key={classItem.id} content={classItem} />
        </Grid>
      ))}
    </Grid>
  );
}
