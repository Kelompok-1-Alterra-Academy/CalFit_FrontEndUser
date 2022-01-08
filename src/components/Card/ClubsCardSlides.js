import { useState, useEffect } from "react";
import ClubsCard from "./ClubsCard";
import styles from "../../../styles/Home.module.css";
import { getAllGyms } from "../../utils/fetchApi/clubs";

export default function ClubsCardSlides({ count }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllGyms(setLoading, setSlides, { limit: count, page: 3 });
  }, [count]);

  return (
    <div className={styles.slides}>
      {/* loop card slides with count */}
      {slides.map((slide, index) => (
        <ClubsCard key={index} index={index} slide={slide} />
      ))}
    </div>
  );
}
