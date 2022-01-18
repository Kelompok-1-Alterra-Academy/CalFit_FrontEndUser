import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../store/AlertReducers";

export function CustomAlert({ data: { message } }) {
  const dispatch = useDispatch();
  const alertContent = useSelector((state) => state.alert.alertContent);
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      showAlert({
        alertContent: {
          status: false,
        },
      })
    );
  };

  useEffect(() => {
    setTimeout(
      () =>
        dispatch(
          showAlert({
            alertContent: {
              status: false,
            },
          })
        ),
      5000
    );
  }, [alertContent.status]);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message={message}
      action={action}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    />
  );
}
