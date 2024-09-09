import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilterBar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
`;
const StyledButton = styled.button`
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.8rem 1.4rem;
    border: none;
    background-color: transparent;

    &:hover,
    &:focus {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }

    ${(props) => props.$active && `box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2)`}
`;

function FilterBar({ filterField, options, className }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options.at(0).value;
    return (
        <StyledFilterBar className={className}>
            {options.map((options) => {
                return (
                    <StyledButton
                        key={options.value}
                        $active={options.value === currentFilter && true}
                        onClick={() => {
                            setSearchParams({ [filterField]: options.value });
                        }}
                    >
                        {options.label}
                    </StyledButton>
                );
            })}
        </StyledFilterBar>
    );
}

export default FilterBar;
