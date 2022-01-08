import { useState, useEffect } from "react";
import ClassesCard from "./ClassesCard";
import styles from "../../../styles/Home.module.css";
import { getAllClasses } from "../../utils/fetchApi/classes";

export default function ClassesCardSlides({ count }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllClasses(setLoading, setSlides, { limit: count, page: 1 });
  }, [count]);

  return (
    <div className={styles.slides}>
      {/* loop card slides with count */}
      {slides.map((slide, index) => (
        <ClassesCard
          key={index}
          index={index}
          slide={slide} />
      ))}
    </div>
  );
}
