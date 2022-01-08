import { useState, useEffect } from "react";
// import { useStyles } from './CardSlidesStyles';
import ClubsCard from "./ClubsCard";
import styles from "../../../styles/Home.module.css";
import { getAllGyms } from "../../utils/fetchApi/clubs";

export default function ClubsCardSlides({ count }) {
  // const styles = useStyles();
  // const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [slidesCount, setSlidesCount] = useState(0);

  useEffect(() => {
    getAllGyms(setLoading, setSlides, { limit: count, page: 3 });
  }, [count]);

  return (
    <div className={styles.slides}>
      {/* loop card slides with count */}
      {slides.map((slide, index) => (
        <ClubsCard
          key={index}
          index={index}
          slide={slide} />
      ))}
      {/* {Array.from(Array(count).keys()).map((i) => (
        <div key={i}>
          <ClubsCard />
        </div>
      ))} */}
    </div>
  );
}
