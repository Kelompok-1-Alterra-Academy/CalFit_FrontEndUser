import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getAllMemberships } from "../../utils/fetchApi/memberships"
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function SubscriptionsRadio() {
    const [value, setValue] = React.useState('false')
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const [memberships, setMemberships] = React.useState([]);

    React.useEffect(() => {
        getAllMemberships(setMemberships);
    }, []);

    const router = useRouter();
    
    return (
        <>
        {(memberships.map((membership) => (
        <form key={membership.id} onSubmit={() => router.push(`/subscription/${membership.id}`)}>
            <FormControl>
                <RadioGroup 
                    aria-labelledby='demo-controlled-radio-buttons-group' 
                    name='controlled-radio-buttons-group'
                    value={value}
                    onChange={handleChange} key={membership.id}>
                        <FormControlLabel
                        value={membership.name}
                        control={<Radio />}
                        label={membership.name}/>
                </RadioGroup>
                <Button type='submit' variant ="contained">
                        Continue
                </Button>
            </FormControl>
        </form>
        )))}
        </>
    )
}

{/* <FormControlLabel
                    value="pro"
                    control={<Radio />}
                    label="Pro"
                    />
                <FormControlLabel
                    value="plus"
                    control={<Radio />}
                    label="Plus"
                    /> */}