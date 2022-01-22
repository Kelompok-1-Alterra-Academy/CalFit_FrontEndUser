import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { bookingClass } from "../../utils/fetchApi/classes";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../store/AlertReducers";
import { CustomAlert } from "../Alert/Alert";

export default function CustomDialog({ setDialog, type, data, setLoading }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.alertContent);
  const banks = ["BCA"];

  const handleClose = () => {
    setDialog(false);
  };

  const handleListItemClick = (id) => {
    setDialog(false);
    data = { ...data, payment_id: id };
    if (type === "payment") {
      bookingClass(setLoading, data);
      dispatch(
        showAlert({
          alertContent: {
            message: "Booking successful",
            status: true,
          },
        })
      );
      setTimeout(() => {
        dispatch(
          showAlert({
            alertContent: {
              status: false,
            },
          })
        );
        router.push("/account/bookings");
      }, 2000);
    }
  };

  return (
    <>
      {alert.status && <CustomAlert data={alert} />}
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Choose Payment Method</DialogTitle>
        <List sx={{ pt: 0 }}>
          {banks.map((bank, i) => (
            <ListItem
              button
              onClick={() => handleListItemClick(i + 1)}
              key={bank}
            >
              <ListItemAvatar>
                <AccountBalanceIcon>
                  <PersonIcon />
                </AccountBalanceIcon>
              </ListItemAvatar>
              <ListItemText primary={bank} />
            </ListItem>
          ))}
        </List>
        <Button></Button>
      </Dialog>
    </>
  );
}
