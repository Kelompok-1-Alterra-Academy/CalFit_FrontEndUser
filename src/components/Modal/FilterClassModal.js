import {
  Box,
  Button,
  Typography,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { style, button } from "./SubscriptionsModalStyles";

export default function FilterClassModal({
  setOpenModal,
  filter: { online },
  setFilterOption,
}) {
  const handleClose = () => setOpenModal(false);
  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ mt: 1 }}
            variant="h3"
            component="h2"
          >
            Filter By
          </Typography>
          <FormGroup>
            {online ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked
                    onChange={() => {
                      setFilterOption({ online: !online });
                    }}
                  />
                }
                label="Online"
              />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {
                      setFilterOption({ online: !online });
                    }}
                  />
                }
                label="Online"
              />
            )}
          </FormGroup>
          <Button sx={button} onClick={handleClose}>
            Filter
          </Button>
        </Box>
      </Modal>
    </>
  );
}
