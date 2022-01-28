import Image from "next/image";
import { useState, useEffect } from "react";
import ClassesCard from "./ClassesCard";
import styles from "../../../styles/Index.module.css";
import { getAllClasses } from "../../utils/fetchApi/classes";
import { parseCookies } from "nookies";
import { getUserByID } from "../../utils/fetchApi/users";
import jwtDecode from "../../utils/jwtDecode/jwtDecode";
import loadingSVG from "../../../public/ripple-loading.svg";

export default function ClassesCardSlides({ count }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = parseCookies();
  const [userdata, setUserdata] = useState();

  useEffect(() => {
    if (token) {
      const { Id } = jwtDecode();
      getUserByID(token, setUserdata, Id);
      getAllClasses(setLoading, setSlides, {
        limit: count,
        page: 1,
        filter: { membershipID: userdata?.membership_type_id },
      });
    } else {
      getAllClasses(setLoading, setSlides, { limit: count, page: 1 });
    }
  }, [count, token, userdata?.membership_type_id]);

  return (
    <>
      {loading ? (
        <div>
          <Image src={loadingSVG} width={200} height={200} alt="loading" />
        </div>
      ) : (
        <div className={styles.slides}>
          {/* loop card slides with count */}
          {slides.map((slide, index) => (
            <ClassesCard key={index} index={index} content={slide} />
          ))}
        </div>
      )}
    </>
  );
}
