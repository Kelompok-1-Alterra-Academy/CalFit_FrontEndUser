import Head from "next/head";
import ClubsCardGrid from "../../src/components/Card/ClubsCardGrid";
import styles from "../../styles/clubs/Index.module.css";

export default function Clubs() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clubs on CalFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.pagetitle}>
          <h1>Clubs</h1>
        </div>
        <div className={styles.description}>
          <h3>Explore All Clubs</h3>
        </div>
        <ClubsCardGrid />
      </main>
    </div>
  );
}
