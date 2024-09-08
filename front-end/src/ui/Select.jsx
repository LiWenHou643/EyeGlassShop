import styled from 'styled-components';

const StyledSelect = styled.select`
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    background-color: var(--color-grey-transparent);

    &:focus {
        outline: none;
    }
`;

function Select({ options, value, onChange, ...props }) {
    return (
        <StyledSelect value={value} onChange={onChange} {...props}>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}

export default Select;
