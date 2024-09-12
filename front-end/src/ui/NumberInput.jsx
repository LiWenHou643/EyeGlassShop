import { useEffect, useState } from 'react';
import Button from './Button';
import styled from 'styled-components';

const Input = styled.input`
    width: 50px;
    text-align: center;
    border: none;
    border-radius: 2px;
    padding: 0.3rem;
`;
function NumberInput({ onChange }) {
    const [value, setValue] = useState(1);
    const inscrease = () => setValue(value + 1);
    const decrease = () => value > 1 && setValue(value - 1);

    const handleOnChange = (e) => {
        isNaN(e.target.value) ? setValue(1) : setValue(e.target.value);
    };
    const handleOnBlur = (e) => {
        isNaN(e.target.value) ? setValue(1) : setValue(e.target.value);
    };

    useEffect(() => {
        onChange && onChange(value);
    }, [onChange, value]);

    return (
        <div className='d-flex align-items-center gap-2'>
            <Button $size='small' $variation='white' onClick={decrease}>
                -
            </Button>
            <Input
                type='text'
                value={value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
            <Button $size='small' $variation='white' onClick={inscrease}>
                +
            </Button>
        </div>
    );
}

export default NumberInput;
