import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useDarkMode } from '../context/DarkModeContext';
import Dropdown from './Dropdown';
import BaseStyledLink from './Link';
import useUser from '../features/authentication/useUser';
import UserMenu from '../features/user/UserMenu';

const StyledHeader = styled.header`
    background: var(--color-header);
    color: var(--color-grey-100);
    padding: 0 3.6rem 0 2rem;
    margin: 0 auto;

    z-index: 1000;

    @media (min-width: 1024px) {
        max-width: ${({ $scrolled }) => ($scrolled ? '100%' : '1000px')};
        height: ${({ $scrolled }) => ($scrolled ? '68px' : '82px')};
        transform: ${({ $scrolled }) =>
            $scrolled ? 'translateY(0)' : 'translateY(50px)'};
        position: ${({ $scrolled }) => ($scrolled ? 'fixed' : 'absolute')};
        inset: 0;
        transition: height 0s, border-radius 0.5s, max-width 0.3s ease;

        > nav {
            margin-top: ${({ $scrolled }) => !$scrolled && '10px'};
        }
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
    transition: 0.5s ease;
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    }
`;

const ToggleDarkMode = styled.button`
    font-size: 2.5rem;
    padding: 0 1rem;
    color: var(--color-grey-800);
    margin-left: 1rem;
    transition: 0.5s ease;
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    }
`;
function Header() {
    const { isAuthenticated } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

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
            <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                    <StyledLink className='navbar-brand px-4' to='/'>
                        EYES HERO
                    </StyledLink>
                    <button
                        href='/eyeglass'
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse pb-3 pb-lg-0'
                        id='navbarSupportedContent'
                    >
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2 px-lg-5 pb-2 pb-lg-0'>
                            <Dropdown
                                items={[
                                    {
                                        link: '/glasses/eyeglasses',
                                        text: 'Eyeglasses',
                                    },
                                    {
                                        link: '/glasses/sunglasses',
                                        text: 'Sunglasses',
                                    },
                                    {
                                        link: '/glasses/eyeframes',
                                        text: 'Eyeframe',
                                    },
                                ]}
                            >
                                <StyledLink
                                    className='rounded-2 text-center'
                                    to='/glasses'
                                >
                                    Glasses
                                </StyledLink>
                            </Dropdown>

                            <li className='nav-item'>
                                <StyledLink
                                    className='dropdown-item text-center'
                                    href='#'
                                >
                                    Contact
                                </StyledLink>
                            </li>
                        </ul>

                        {isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <LoginButton className='btn' to='/login'>
                                Login
                            </LoginButton>
                        )}

                        <ToggleDarkMode
                            className='btn'
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
                        </ToggleDarkMode>
                    </div>
                </div>
            </nav>
        </StyledHeader>
    );
}

export default Header;
