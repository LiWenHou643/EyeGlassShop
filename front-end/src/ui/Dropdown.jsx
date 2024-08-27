import { useState } from 'react';
import styled from 'styled-components';
import BaseStyledLink from './Link';

const StyledLink = styled(BaseStyledLink)`
    font-size: 2rem;
    width: 120px;
    &:hover {
        background-color: var(--color-grey-700);
    }
`;
const DropdownMenu = styled.ul`
    background-color: var(--color-grey-900);
    border-radius: 0.5rem;
    z-index: 1000;
    width: 120px;

    li {
        &:not(:last-child) {
            border-bottom: 1px solid var(--color-grey-800);
        }
        &:hover {
            background-color: var(--color-grey-700);
        }

        &:first-child:hover {
            border-radius: 0.5rem 0.5rem 0 0;
        }
        &:last-child:hover {
            border-radius: 0 0 0.5rem 0.5rem;
        }
    }
`;

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
                <StyledLink className='rounded-2 text-center' to={linkTo}>
                    {linkText}
                </StyledLink>
            )}

            {isDropdownOpen && (
                <DropdownMenu className='position-absolute top-100'>
                    {items.map((item, index) => (
                        <li key={index}>
                            <BaseStyledLink
                                className='dropdown-item'
                                to={item.link}
                            >
                                <P>{item.text}</P>
                            </BaseStyledLink>
                        </li>
                    ))}
                </DropdownMenu>
            )}
        </li>
    );
}

export default Dropdown;
