/* eslint-disable @next/next/link-passhref */
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import ClubsCardSlides from "../src/components/Card/ClubsCardSlides";
import ClassesCardSlides from "../src/components/Card/ClassesCardSlides";
import { useSelector } from "react-redux";
import { CustomAlert } from "../src/components/Alert/Alert";
import SubscriptionModal from "../src/components/Modal/SubscriptionsModal";
import { parseCookies } from "nookies";

export default function Home() {
  const alertContent = useSelector((state) => state.alert.alertContent);
  const { token } = parseCookies();
  return (
    <div className={styles.root}>
      <Head>
        <title>CalFit Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bghome}>
        <Image
          src="/backdrop-home.png"
          className={styles.bdhome}
          alt="Backdrop Home"
          width={414}
          height={402}
        />
      </div>
      <header className={styles.header}>
        <Image
          src="/calfit-logo.png"
          className={styles.logo}
          alt="CalFit Logo"
          width={65}
          height={12}
        />
        {token && (
          <Link href="/account">
            <Image
              src="/dummy-pp.png"
              className={styles.ppdummy}
              alt="Profile Picture Dummy"
              width={65}
              height={65}
            />
          </Link>
        )}
      </header>
      <main className={styles.main}>
        <div className={styles.div1}>
          <SubscriptionModal />
        </div>
        <div className={styles.div2}>
          <h2>Explore Clubs</h2>
          <Link href="/clubs" passHref>
            <div className={styles.viewall}>View All</div>
          </Link>
        </div>
        <ClubsCardSlides count={5} />
        <div className={styles.div3}>
          <h2>Explore Classes</h2>
          <Link href="/classes" passHref>
            <div className={styles.viewall}>View All</div>
          </Link>
        </div>
        <ClassesCardSlides count={5} />
      </main>
      <br />
      <br />
      {alertContent.status && <CustomAlert data={alertContent} />}
    </div>
  );
}
