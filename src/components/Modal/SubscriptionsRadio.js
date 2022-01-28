import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { getAllMemberships } from "../../utils/fetchApi/memberships";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {
  chooseMember,
  boxMember,
  formMember,
  button,
} from "./SubscriptionsModalStyles";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { updateUser } from "../../../src/utils/fetchApi/users";
import jwtDecode from "../../utils/jwtDecode/jwtDecode";

export default function SubscriptionsRadio() {
  const { token } = parseCookies();
  const [value, setValue] = useState();
  const handleOnClick = (id) => {
    setValue(id);
  };

  const handleButtonClick = async () => {
    if (token) {
      const { Email } = jwtDecode();
      await updateUser(token, { email: Email, membershipID: value });
      setTimeout(() => {
        router.push(`/subscription/${value}`);
      }, 2000);
    } else {
      router.push("/login");
    }
  };

  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    getAllMemberships(setMemberships);
  }, []);

  const router = useRouter();

  return (
    <>
      <form>
        <FormControl sx={formMember}>
          <Box sx={chooseMember}>
            <RadioGroup
              row
              sx={boxMember}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="subscription"
            >
              {memberships.map((membership) => (
                <>
                  <FormControlLabel
                    onClick={() => handleOnClick(membership.id)}
                    key={membership.id}
                    value={membership.id}
                    control={<Radio />}
                    label={`${membership.name}`}
                    labelPlacement="bottom"
                  ></FormControlLabel>
                </>
              ))}
            </RadioGroup>
          </Box>
          <Button
            sx={(button, { mt: 2 })}
            onClick={() => handleButtonClick()}
            variant="contained"
          >
            Continue
          </Button>
        </FormControl>
      </form>
    </>
  );
}
