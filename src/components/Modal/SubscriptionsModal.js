import * as React from 'react';
import { Box , Button, Typography, Modal } from '@mui/material';
import { style, imgdrop, button } from './SubscriptionsModalStyles';
import Image from 'next/image';
import SubscriptionsRadio from './SubscriptionsRadio';
import { getAllMemberships } from '../../utils/fetchApi/memberships';
import { useRouter } from 'next/router';

export default function SubscriptionModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [memberships, setMemberships] = React.useState([]);

    React.useEffect(() => {
        getAllMemberships(setMemberships);
    }, []);

    const router = useRouter();

    return (
        <>
        <Button onClick={handleOpen} variant="contained">
              Our Membership Plan
        </Button>
        <Modal
            open={open} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={ style }>
                    <Image
                        sx={ imgdrop }
                        src="/backdrop-subs.png"
                        className='bdsubs'
                        alt="Backdrop Subscription"
                        width={879}
                        height={597}
                    />
                    <Typography id="modal-modal-title" sx={{mt: 1}} variant="h3" component="h2">
                        Our Subscriptions
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt : 1 }}>
                        Choose your subscription now, you can cancel or change your subscription later.
                    </Typography>
                    <SubscriptionsRadio/>
                    <Button sx= {button} onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
        </Modal>
        </>
    )
}