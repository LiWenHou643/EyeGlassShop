import { useState } from 'react';
import styled from 'styled-components';
import BaseStyledLink from './Link';

const DropdownMenu = styled.ul`
    color: var(--color-grey-900);
    background-color: var(--color-grey-0);
    border-radius: 0.5rem;
    z-index: 1000;
    width: 120px;

    li {
        &:not(:last-child) {
            border-bottom: 1px solid var(--color-grey-200);
        }
        &:hover {
            background-color: var(--color-grey-300);
        }
        &:first-child {
            border-radius: 0.5rem 0.5rem 0 0;
        }
        &:last-child {
            border-radius: 0 0 0.5rem 0.5rem;
        }
    }
`;

const P = styled.p`
    font-size: 1.6rem;
    padding: 0.5rem 1rem !important;
`;

function Dropdown({ items, children }) {
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
            {children}
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
