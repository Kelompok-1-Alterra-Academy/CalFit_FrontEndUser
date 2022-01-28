import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../../../styles/Index.module.css";
import { getAllClasses } from "../../utils/fetchApi/classes";
import FeaturedClassesCard from "./FeaturedClassesCard";
import loadingSVG from "../../../public/ripple-loading.svg";

export default function FeaturedClassesCardSlides({ count }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllClasses(setLoading, setSlides, { limit: count, page: 1 });
  }, [count]);

  return (
    <>
      {loading ? (
        <div>
          <Image src={loadingSVG} width={200} height={200} alt="loading" />
        </div>
      ) : (
        <div className={styles.banner}>
          {/* loop card slides with count */}
          {slides.map((slide, index) => (
            <FeaturedClassesCard key={index} index={index} content={slide} />
          ))}
        </div>
      )}
    </>
  );
}
