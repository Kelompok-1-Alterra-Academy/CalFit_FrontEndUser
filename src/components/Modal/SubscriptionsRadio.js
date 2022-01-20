import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getAllMemberships } from "../../utils/fetchApi/memberships"
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

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
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <FormControl>
            {(memberships.map((membership) => (
                <RadioGroup 
                    aria-labelledby='demo-controlled-radio-buttons-group' 
                    name='subscription'
                    value={value}
                    onChange={handleChange} key={membership.id}>
                        <FormControlLabel
                        value={membership.id}
                        control={<Radio />}
                        label={membership.name}>
                        </FormControlLabel>
                </RadioGroup>
            )))}
                <Button type='submit' variant ="contained">
                        Continue
                </Button>
            </FormControl>
        </form>
        </>
    )
}