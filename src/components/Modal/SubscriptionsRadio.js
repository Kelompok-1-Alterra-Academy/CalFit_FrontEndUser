import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getAllMemberships } from "../../utils/fetchApi/memberships"
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { chooseMember, boxMember, formMember, button, price } from './SubscriptionsModalStyles';

export default function SubscriptionsRadio() {
    const [value, setValue] = React.useState(3)
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const [memberships, setMemberships] = React.useState([]);

    React.useEffect(() => {
        getAllMemberships(setMemberships);
    }, []);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(memberships).forEach(([key, value]) => {
            formData.append(key, value);
        });
        router.push(`/subscription/${value}`);

    };
    
    var formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    })
    return (
        <>
        <form onSubmit={handleSubmit}>
            <FormControl sx = { formMember }>
                <Box sx = { chooseMember}>
                    {(memberships.map((membership) => (
                        <RadioGroup 
                            sx = { boxMember }
                            aria-labelledby='demo-controlled-radio-buttons-group' 
                            name='subscription'
                            value={value}
                            onChange={handleChange} key={membership.id}>
                                <FormControlLabel
                                value={membership.id}
                                control={<Radio />}
                                label={membership.name}
                                labelPlacement="bottom">
                                </FormControlLabel>
                                <Typography sx={price}>{membership.price}</Typography>
                        </RadioGroup>
                    )))}
                </Box>
                <Button sx={button, {mt: 2}} type='submit' variant ="contained">
                    Continue
                </Button>
            </FormControl>
        </form>
        </>
    )
}