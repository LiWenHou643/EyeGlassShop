import styled from 'styled-components';

const Select = styled.select`
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    background-color: var(--color-grey-transparent);
    width: 100%;
    &:focus {
        outline: none;
    }
`;

export default Select;
