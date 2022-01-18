import * as React from 'react';
import { Box , Button, Typography, Modal } from '@mui/material';
import { style } from './SubscriptionsModalStyles';
import Image from 'next/image';
import SubscriptionsRadio from './SubscriptionsRadio';

export default function SubscriptionModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                        src="/backdrop-subs.png"
                        className='bdsubs'
                        alt="Backdrop Subscription"
                        width={293}
                        height={199}
                    />
                    <Typography id="modal-modal-title" sx={{mt: 1}} variant="h3" component="h2">
                        Our Subscriptions
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt : 1 }}>
                        Choose your subscription now, you can cancel or change your subscription later.
                    </Typography>
                    <div className='buttonSubs' sx={{ mt : 1 }}>
                        <SubscriptionsRadio/>
                        <Button variant ="contained">
                            Continue
                        </Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Box>
        </Modal>
        </>
    )
}