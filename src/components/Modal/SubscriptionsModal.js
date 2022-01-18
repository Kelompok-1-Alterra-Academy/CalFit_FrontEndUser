import * as React from 'react';
import { Box , Button, Typography, Modal } from '@mui/material';
import { useStyles } from './SubscriptionsModalStyles';

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
                <Box sx={ useStyles }>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt : 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
        </Modal>
        </>
    )
}