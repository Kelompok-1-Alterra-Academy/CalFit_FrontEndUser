import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClassesCardListGrid from "../../src/components/Card/ClassesCardListGrid";
import styles from "../../styles/classes/Index.module.css";
import FeaturedClassesCardSlides from "../../src/components/Card/FeaturedClassesSlides";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import FilterClassModal from "../../src/components/Modal/FilterClassModal";
import { getUserByID } from "../../src/utils/fetchApi/users";
import jwtDecode from "../../src/utils/jwtDecode/jwtDecode";

export default function Classes() {
  const { token } = parseCookies();
  const [openModal, setOpenModal] = useState(false);
  const [filterOption, setFilterOption] = useState({
    online: false,
    membershipID: 0,
  });
  const [userdata, setUserdata] = useState();

  const handleOnClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (token) {
      const { Id } = jwtDecode();
      getUserByID(token, setUserdata, Id);
      setFilterOption({
        ...filterOption,
        membershipID: userdata?.membership_type_id,
      });
    }
  }, [token, userdata?.membership_type_id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Classes on CalFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.pagetitle}>
          <h1>Classes</h1>
          {token && (
            <Link href="/account" passHref>
              <Image
                src="/dummy-pp.png"
                className={styles.ppdummy}
                alt="Profile Picture Dummy"
                height={65}
                width={65}
              />
            </Link>
          )}
        </div>
        <div className={styles.description}>
          <h3>Featured Classes</h3>
        </div>
        {/* <FeaturedClassesCardSlides/> */}
        <div className={styles.description}>
          <h3>Explore All Classes</h3>
          <FilterAltIcon
            className={styles.filtericon}
            onClick={() => handleOnClick()}
          />
        </div>
        {openModal && (
          <FilterClassModal
            setOpenModal={setOpenModal}
            filter={{ online: filterOption.online }}
            setFilterOption={setFilterOption}
          ></FilterClassModal>
        )}
        <ClassesCardListGrid filter={filterOption} />
      </main>
    </div>
  );
}
