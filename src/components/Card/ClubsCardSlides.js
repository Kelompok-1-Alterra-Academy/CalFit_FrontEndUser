import { useState, useEffect } from "react";
import ClubsCard from "./ClubsCard";
import { getAllGyms } from "../../utils/fetchApi/clubs";
import loadingSVG from "../../../public/ripple-loading.svg";
import Image from "next/image";

export default function ClubsCardSlides({ count }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllGyms(setLoading, setSlides, { limit: count, page: 1 });
  }, [count]);

  return (
    <>
      {loading ? (
        <div>
          <Image src={loadingSVG} width={200} height={200} alt="loading" />
        </div>
      ) : (
        <div>
          {/* loop card slides with count */}
          {slides.map((slide, index) => (
            <ClubsCard key={index} index={index} club={slide} />
          ))}
        </div>
      )}
    </>
  );
}
