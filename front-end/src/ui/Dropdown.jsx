import { useState } from 'react';
import styled from 'styled-components';
import BaseStyledLink from './Link';

const StyledLink = styled(BaseStyledLink)`
    width: 120px;
    font-size: 2rem;

    &:hover {
        background-color: var(--color-grey-200);
        border-radius: 0.5rem;
    }
`;

const DropdownMenu = styled.ul`
    background-color: var(--color-grey-100);
    border-radius: 0.5rem;
`;

const DropdownItem = styled.li``;

const P = styled.p`
    font-size: 1.6rem;
    padding: 0.5rem 1rem !important;
`;

function Dropdown({ items, linkText, linkTo = '#' }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    return (
        <li
            className='dropdown-container d-flex align-items-center position-relative'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {linkTo === '#' ? (
                <P>{linkText}</P>
            ) : (
                <StyledLink to={linkTo}>{linkText}</StyledLink>
            )}

            {isDropdownOpen && (
                <DropdownMenu className='position-absolute top-100'>
                    {items.map((item, index) => (
                        <DropdownItem key={index}>
                            <StyledLink
                                className='dropdown-item'
                                to={item.link}
                            >
                                <P>{item.text}</P>
                            </StyledLink>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </li>
    );
}

export default Dropdown;
