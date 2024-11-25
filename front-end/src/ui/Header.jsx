import { useEffect, useState } from 'react';
import {
    HiBars3,
    HiOutlineMoon,
    HiOutlineShoppingCart,
    HiOutlineSun,
    HiOutlineXMark,
} from 'react-icons/hi2';
import { styled } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import { useCart } from '../features/cart/useCart';
import UserMenu from '../features/user/UserMenu';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import Dropdown from './Dropdown';
import BaseStyledLink from './Link';

const Header = () => {
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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setShowHeaderMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { auth } = useAuth();

    const { count } = useCart();

    const isAuth = auth?.accessToken || false;
    return (
        <StyledHeader $scrolled={scrolled} className='w-100'>
            <nav className='w-100 d-flex justify-content-between align-items-center position-relative'>
                <StyledLink className='navbar-brand px-4' to='/'>
                    EYES HERO
                </StyledLink>
                <ToggleHeaderMenu
                    $variation='toggle'
                    $active={showHeaderMenu}
                    className='d-flex d-md-none'
                    onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                >
                    {showHeaderMenu ? <HiOutlineXMark /> : <HiBars3 />}
                </ToggleHeaderMenu>
                <StyledHeaderMenu $display={showHeaderMenu}>
                    <Dropdown
                        items={[
                            {
                                link: '/products?category=eyeglasses',
                                text: 'Eyeglasses',
                            },
                            {
                                link: '/products?category=sunglasses',
                                text: 'Sunglasses',
                            },
                            {
                                link: '/products?category=eyelens',
                                text: 'Eyelens',
                            },
                        ]}
                    >
                        <StyledLink
                            className='text-left text-md-center ps-4 ps-md-0'
                            to='/products'
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
                    {isAuth ? (
                        <UserMenu auth={auth} />
                    ) : (
                        <LoginButton className='ps-4 ps-md-0' to='/login'>
                            Login
                        </LoginButton>
                    )}
                </StyledHeaderMenu>
                <Actions>
                    <CartIcon to={'user/cart'} $variation='toggle'>
                        <HiOutlineShoppingCart className='fs-2' />
                        <span className='position-absolute top-25 fs-6 start-25 translate-middle badge rounded-pill bg-danger'>
                            {count}
                        </span>
                    </CartIcon>
                    <ToggleDarkMode
                        $variation='toggle'
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
                    </ToggleDarkMode>
                </Actions>
            </nav>
        </StyledHeader>
    );
};

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
        color: var(--color-grey-700);
    }
    border-radius: 0.5rem;
    transition: color 0.3s ease;
`;

const LoginButton = styled(StyledLink)`
    text-align: center;
    transition: 0.3s ease;
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        &:hover {
            box-shadow: none;
        }

        text-align: left;
    }
`;

const ToggleDarkMode = styled(Button)`
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        color: var(--color-grey-100);
    }
    @media (max-width: 768px) {
        margin-left: auto;
    }
`;

const CartIcon = styled(StyledLink)`
    position: relative;
    width: auto;
    padding: 0.5rem 1.2rem;

    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        color: var(--color-grey-100);
    }

    @media (max-width: 768px) {
        margin-left: auto !important;
    }import { useCartCtx } from '../hooks/useCartCtx';

`;

const Actions = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        margin-left: auto;
        margin-right: 5rem;
    }
`;

const ToggleHeaderMenu = styled(Button)`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    ${({ $active }) => ($active ? 'color: var(--color-grey-100)' : '')}
`;

const StyledHeaderMenu = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-grey-100);
    background: var(--color-header);
    transition: 0.3s ease;

    position: absolute;
    top: 80%;
    right: 0;
    z-index: 10;
    border-radius: 0.5rem;

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

export default Header;
