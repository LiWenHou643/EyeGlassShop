import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    z-index: 1000;
`;
const StyledLink = styled(Link)`
    padding: 0.4rem 0.5rem;
    margin: 0 !important;
    font-size: ${(props) =>
        props?.className?.includes('navbar-brand') ? '3rem' : '2rem'};

    color: var(--color-grey-700);
    margin: 0 0.5rem;

    &:hover {
        background-color: ${(props) =>
            props?.className?.includes('dropdown-item') &&
            'var(--color-grey-200)'};
    }
    border-radius: 0.5rem;
`;

const StyledDiv = styled.a`
    font-size: 2rem;
    padding: 0.4rem;
    color: var(--color-grey-700);
    border-radius: 0.5rem;

    &:hover {
        background-color: var(--color-grey-200);
    }
`;

const P = styled.p`
    font-size: 1.6rem;
    padding: 0.5rem 1rem !important;
`;
function Header() {
    return (
        <StyledHeader className='w-100'>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container-fluid'>
                    <StyledLink className='navbar-brand px-5' to='/'>
                        EYES HERO
                    </StyledLink>
                    <button
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
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item dropdown'>
                                <StyledDiv
                                    className='nav-link dropdown-toggle'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                >
                                    Glasses
                                </StyledDiv>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <StyledLink
                                            className='dropdown-item'
                                            to='/glasses/eyeglasses'
                                        >
                                            <P>Eyeglasses</P>
                                        </StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink
                                            className='dropdown-item'
                                            to='/glasses/sunglasses'
                                        >
                                            <P>Sunglasses</P>
                                        </StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink className='dropdown-item'>
                                            <P>Eyeframe</P>
                                        </StyledLink>
                                    </li>
                                </ul>
                            </li>

                            <li className='nav-item'>
                                <StyledLink className='dropdown-item' href='#'>
                                    Contact
                                </StyledLink>
                            </li>
                        </ul>

                        <StyledLink
                            className='px-4 btn btn-outline-success'
                            to='/login'
                        >
                            Login
                        </StyledLink>
                    </div>
                </div>
            </nav>
        </StyledHeader>
    );
}

export default Header;
