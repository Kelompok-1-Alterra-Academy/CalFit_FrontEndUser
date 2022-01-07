import * as React from 'react';
// import { useStyles } from './CardSlidesStyles';
import ClubsCard from './ClubsCard';
import styles from "../../../styles/Home.module.css";

export default function ClubsCardSlides({ count }) {
  // const styles = useStyles();
  // const [slideIndex, setSlideIndex] = React.useState(0);
  // const [slides, setSlides] = React.useState([]);
  // const [slidesCount, setSlidesCount] = React.useState(0);

  return (

    <div className={styles.slides}>
      {/* loop card slides with count */}
      {Array.from(Array(count).keys()).map(i => (
        <div key={i}>
          <ClubsCard />
        </div>
      ))}
    </div>
  );
}