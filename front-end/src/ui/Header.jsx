import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import {
    HiBars3,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineXMark,
} from 'react-icons/hi2';
import { useDarkMode } from '../context/DarkModeContext';
import Dropdown from './Dropdown';
import BaseStyledLink from './Link';
import useUser from '../features/authentication/useUser';
import UserMenu from '../features/user/UserMenu';

const StyledHeader = styled.header`
    background: var(--color-header);
    color: var(--color-grey-100);
    padding: 0 2rem;
    margin: 0 auto;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 1024px) {
        max-width: ${({ $scrolled }) => ($scrolled ? '100%' : '1000px')};
        height: ${({ $scrolled }) => ($scrolled ? '68px' : '82px')};
        transform: ${({ $scrolled }) =>
            $scrolled ? 'translateY(0)' : 'translateY(50px)'};
        position: ${({ $scrolled }) => ($scrolled ? 'fixed' : 'absolute')};
        inset: 0;
        transition: height 0s, border-radius 0.5s, max-width 0.3s ease;
    }
`;

const StyledLink = styled(BaseStyledLink)`
    font-size: ${(props) =>
        props?.className?.includes('navbar-brand') ? '3rem' : '2rem'};

    width: ${(props) => !props?.className?.includes('navbar-brand') && '120px'};

    color: var(--color-grey-700);
    &:hover {
        color: var(--color-grey-100);
    }
    &:focus {
        color: var(--color-grey-100);
    }
    border-radius: 0.5rem;
    transition: color 0.3s ease;
`;

const LoginButton = styled(StyledLink)`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        transition: 0.5s ease;
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--color-grey-700);
        padding: 0.2rem 1rem;

        &:hover {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
            color: var(--color-grey-100);
        }
    }

    @media (max-width: 768px) {
        justify-content: start;
        padding: 0.6rem !important;

        &:hover button {
            box-shadow: none;
            color: var(--color-grey-100);
        }
    }
`;

const ToggleDarkMode = styled.button`
    font-size: 2.5rem;
    padding: 0rem 1rem;
    height: 40px;
    color: var(--color-grey-800);
    margin-left: 1rem;
    transition: 0.5s ease;
    background-color: transparent;
    border: none;
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        color: var(--color-grey-100);
    }
    @media (max-width: 768px) {
        margin-left: auto;
    }
`;

const ToggleHeaderMenu = styled.button`
    position: absolute;
    right: 4rem;
    top: 53%;
    transform: translateY(-50%);
    font-size: 2.8rem;
    transition: 0.3s ease;
    height: 40px;

    ${({ $active }) => ($active ? 'color: var(--color-grey-100)' : '')}
`;

const StyledHeaderMenu = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 2;
    color: var(--color-grey-100);
    background: var(--color-header);
    transition: 0.3s ease;

    ${({ $display }) => ($display ? 'display: flex;' : 'display: none;')}

    a {
        padding: 0.6rem 0;
    }
    @media (min-width: 768px) {
        background: transparent;
        display: flex;
        background-color: transparent;
        position: relative;
        flex-direction: row;
        justify-content: end;
    }
`;

function Header() {
    const { isAuthenticated } = useUser();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [scrolled, setScrolled] = useState(false);
    const [showHeaderMenu, setShowHeaderMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <StyledHeader $scrolled={scrolled} className='w-100'>
            <nav className='w-100 d-flex justify-content-between align-items-center position-relative'>
                <StyledLink className='navbar-brand px-4' to='/'>
                    EYES HERO
                </StyledLink>
                <ToggleHeaderMenu
                    $active={showHeaderMenu}
                    className='d-flex d-md-none btn'
                    onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                >
                    {showHeaderMenu ? <HiOutlineXMark /> : <HiBars3 />}
                </ToggleHeaderMenu>
                <StyledHeaderMenu $display={showHeaderMenu}>
                    <Dropdown
                        items={[
                            {
                                link: '/glasses?category=eyeglasses',
                                text: 'Eyeglasses',
                            },
                            {
                                link: '/glasses?category=sunglasses',
                                text: 'Sunglasses',
                            },
                            {
                                link: '/glasses?category=eyelens',
                                text: 'Eyelens',
                            },
                        ]}
                    >
                        <StyledLink
                            className='text-left text-md-center ps-4 ps-md-0'
                            to='/glasses'
                        >
                            Glasses
                        </StyledLink>
                    </Dropdown>

                    <StyledLink
                        className='text-left text-md-center ps-4 ps-md-0'
                        href='#'
                    >
                        Contact
                    </StyledLink>
                    <LoginButton>
                        {isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <button to='/login'>
                                <p>Login</p>
                            </button>
                        )}
                    </LoginButton>
                </StyledHeaderMenu>
                <ToggleDarkMode onClick={toggleDarkMode}>
                    {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
                </ToggleDarkMode>
            </nav>
        </StyledHeader>
    );
}

export default Header;
