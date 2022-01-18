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

const banks = ["BCA", "MANDIRI"];

export default function CustomDialog({ setDialog, type, data, setLoading }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setDialog({ isOpen: false });
  };

  const handleListItemClick = (id) => {
    data = { ...data, payment_id: id };
    type === "payment" && bookingClass(setLoading, data);
    setOpen(false);
    router.push("/");
  };

  return (
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
  );
}
