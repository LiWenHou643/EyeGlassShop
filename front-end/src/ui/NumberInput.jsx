import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Input = styled.input`
    width: 50px;
    text-align: center;
    border: none;
    border-radius: 2px;
    padding: 0.3rem;
    background-color: var(--color-grey-100);
`;
function NumberInput({ initialValue, onChange, disabled }) {
    const [value, setValue] = useState(initialValue || 1);
    const increase = () => {
        const newValue = value + 1;
        setValue(newValue);
        onChange(newValue);
    };

    const decrease = () => {
        if (value > 1) {
            const newValue = value - 1;
            setValue(newValue);
            onChange(newValue);
        }
    };

    const handleOnChange = (e) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue)) {
            setValue(newValue);
            onChange(newValue); // Call onChange directly here
        }
    };

    const handleOnBlur = (e) => {
        const newValue = Number(e.target.value);
        const finalValue = isNaN(newValue) ? 1 : newValue;
        setValue(finalValue);
        onChange(finalValue); // Ensure onChange is called when input loses focus
    };

    return (
        <div className='d-flex align-items-center justify-content-center gap-2'>
            <Button
                $size='small'
                $variation='white'
                onClick={decrease}
                disabled={disabled}
            >
                -
            </Button>
            <Input
                type='text'
                value={value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
            <Button
                $size='small'
                $variation='white'
                onClick={increase}
                disabled={disabled}
            >
                +
            </Button>
        </div>
    );
}

export default NumberInput;
