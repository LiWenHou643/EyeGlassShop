import { styled } from 'styled-components';
import Dropdown from './Dropdown';
import BaseStyledLink from './Link';
import { HiOutlineUser } from 'react-icons/hi2';
import { exactNameFromEmail } from '../utils/helperFunction';
import useUser from '../features/authentication/useUser';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    z-index: 1000;
`;

const StyledLink = styled(BaseStyledLink)`
    font-size: ${(props) =>
        props?.className?.includes('navbar-brand') ? '3rem' : '2rem'};

    width: ${(props) => !props?.className?.includes('navbar-brand') && '120px'};

    &:hover {
        background-color: ${(props) =>
            props?.className?.includes('dropdown-item') &&
            'var(--color-grey-200)'};
    }
    border-radius: 0.5rem;
`;

function Header() {
    const { isAuthenticated, user } = useUser();
    console.log('user', user);
    return (
        <StyledHeader className='w-100'>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container-fluid'>
                    <StyledLink className='navbar-brand px-lg-5' to='/'>
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
                            <Dropdown />

                            <li className='nav-item'>
                                <StyledLink className='dropdown-item' href='#'>
                                    Contact
                                </StyledLink>
                            </li>
                        </ul>

                        {isAuthenticated ? (
                            <div>
                                <HiOutlineUser />
                                <span>{exactNameFromEmail(user?.email)}</span>
                            </div>
                        ) : (
                            <StyledLink
                                className='px-4 btn btn-outline-success'
                                to='/login'
                            >
                                Login
                            </StyledLink>
                        )}
                    </div>
                </div>
            </nav>
        </StyledHeader>
    );
}

export default Header;
