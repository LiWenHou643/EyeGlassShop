import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import { useLogout } from '../features/authentication/useLogout';
const Admin = () => {
    return (
        <Container className='row gx-0 min-vh-100'>
            <aside className='col-2 min-vh-100'>
                <Side />
            </aside>
            <main className='col-10'>
                <Outlet />
            </main>
        </Container>
    );
};

const Side = (props) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { logout } = useLogout();
    return (
        <div onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
            <div className='sidebar-sticky'></div>
            <ul className='d-flex flex-column'>
                <div className='ms-4 nav-item align-items-center d-flex toggle-darkmode'>
                    <HiOutlineSun />
                    <div className='ms-2 form-check form-switch'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='themingSwitcher'
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />
                    </div>

                    <HiOutlineMoon />
                </div>
                <StyledNavLink to='dashboard'>Dashboard</StyledNavLink>
                <StyledNavLink to='orders'>Orders</StyledNavLink>
                <LogOut onClick={() => logout()}>Log out</LogOut>
            </ul>
        </div>
    );
};

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    color: var(--color-grey-900);
    &:hover {
        color: var(--color-grey-100);
        background-color: var(--color-grey-800);
    }
    transition: all 0.3s;

    &.active {
        background-color: var(--color-grey-800);
        color: var(--color-grey-100);
    }
`;

const LogOut = styled.button`
    text-decoration: none;
    padding: 10px;
    margin: 5px;
    outline: none;
    border: none;
    text-align: left;
    border-radius: 5px;
    background-color: var(--color-red-400);
    color: var(--color-grey-900);
    &:hover {
        color: var(--color-grey-100);
        background-color: var(--color-red-600);
    }
    transition: all 0.3s;
`;

const Container = styled.div`
    > aside {
        position: relative;
        overflow: hidden;
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--color-grey-0);
            opacity: 0.6;
            z-index: 1;
        }
        & > * {
            position: relative;
            z-index: 2;
        }
    }
`;

export default Admin;
