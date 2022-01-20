import { useState, useEffect } from "react";
import styles from "../../../styles/Home.module.css";
import { getAllClasses } from "../../utils/fetchApi/classes";
import FeaturedClassesCard from "./FeaturedClassesCard";

export default function FeaturedClassesCardSlides({ count }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllClasses(setLoading, setSlides, { limit: count, page: 1 });
  }, [count]);

  return (
    <div className={styles.banner}>
      {/* loop card slides with count */}
      {slides.map((slide, index) => (
        <FeaturedClassesCard key={index} index={index} content={slide} />
      ))}
    </div>
  );
}