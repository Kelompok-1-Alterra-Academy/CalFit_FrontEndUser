import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SubscriptionsRadio() {
    const [value, setValue] = React.useState('basic')

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl>
            <RadioGroup 
                aria-labelledby='demo-controlled-radio-buttons-group' 
                name='controlled-radio-buttons-group'
                value={value}
                onChange={handleChange}>
                <FormControlLabel
                    value="basic"
                    control={<Radio />}
                    label="Basic"
                    />
                <FormControlLabel
                    value="pro"
                    control={<Radio />}
                    label="Pro"
                    />
                <FormControlLabel
                    value="plus"
                    control={<Radio />}
                    label="Plus"
                    />
            </RadioGroup>
        </FormControl>
    )
}