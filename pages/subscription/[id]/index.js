import * as React from 'react';
import { useRouter } from 'next/router';
import { getMembershipsById } from '../../../src/utils/fetchApi/memberships';
import styles from "../../../styles/subscriptions/[id]/Index.module.css";
import Loading from '../../../src/components/page/Loading';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@mui/material';

export default function MembershipConfirmation() {
    
    const router = useRouter();
    const [membership, setMembership] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const id = router.query.id;
        if (id) getMembershipsById(setLoading, setMembership, id);
    }, [router.query.id]);

    return loading || !membership ? (
        <Loading/>
    ) : (
        <div className={styles.container}>
            <Head>
            <title>Conglaturations, You are now {membership.name} member.</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.content}>
                <Image
                        src="/hooray.gif"
                        className={styles.gifmember}
                        alt="GIF Success"
                        width={900}
                        height={506}
                    />
                <h1 className={styles.title}>
                    Congratulations
                </h1>
                <p>
                    You are now a {membership.name} member
                </p>
                <p>
                    {membership.description}
                </p>
                <Button variant ="contained">
                    See Classes
                </Button>
            </div>
        </div>
    )
}