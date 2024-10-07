import { useEffect, useState } from 'react';
import Button from './Button';
import styled from 'styled-components';

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
    const inscrease = () => setValue(value + 1);
    const decrease = () => value > 1 && setValue(value - 1);

    const handleOnChange = (e) => {
        isNaN(e.target.value)
            ? setValue(value)
            : setValue(Number(e.target.value));
    };
    const handleOnBlur = (e) => {
        isNaN(e.target.value) ? setValue(1) : setValue(Number(e.target.value));
    };

    useEffect(() => {
        onChange && onChange(value);
    }, [onChange, value]);

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
                onClick={inscrease}
                disabled={disabled}
            >
                +
            </Button>
        </div>
    );
}

export default NumberInput;
