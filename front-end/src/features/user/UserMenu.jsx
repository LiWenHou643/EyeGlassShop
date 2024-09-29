import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import { exactNameFromEmail } from '../../utils/helperFunction';
import styled from 'styled-components';
import BaseStyledLink from '../../ui/Link';
import Modal from '../../ui/Modal';
import { useLogout } from '../authentication/useLogout';

const MenuList = styled.ul`
    background-color: var(--color-grey-100);
    position: absolute;
    top: 3.8rem;
    width: 120px;
    z-index: 1000;
    color: var(--color-grey-800);
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

const UserButton = styled.div`
    cursor: pointer;
    color: var(--color-grey-800);
    padding: 0.5rem 1rem;
`;

const UserName = styled.p`
    font-size: 2rem;
    color: var(--color-grey-700);
`;

function UserMenu({ user }) {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useLogout();
    console.log('usermenu', user);

    const isAdmin = user?.roles.name === 'ADMIN';

    const handleMouseEnter = () => {
        setShowMenu(true);
    };

    const handleMouseLeave = () => {
        setShowMenu(false);
    };

    return (
        <div
            className='dropdown-container d-flex align-items-center position-relative me-2'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <UserButton className='d-flex justify-content-center align-items-center gap-2'>
                <HiOutlineUser />
                {user && <UserName>{exactNameFromEmail(user?.email)}</UserName>}
            </UserButton>
            {showMenu && (
                <MenuList className='rounded-3'>
                    <li>
                        <BaseStyledLink
                            className='dropdown-item py-3 px-5'
                            to='/user/cart'
                        >
                            {isAdmin ? 'Orders' : 'Cart'}
                        </BaseStyledLink>
                    </li>
                    <li>
                        <BaseStyledLink
                            className='dropdown-item py-3 px-5'
                            to={isAdmin ? '/admin/setting' : '/user/profile'}
                        >
                            {isAdmin ? 'Setting' : 'Profile'}
                        </BaseStyledLink>
                    </li>
                    <li>
                        <Modal>
                            <Modal.Open opens='logout'>
                                <BaseStyledLink
                                    className='dropdown-item py-3 px-5'
                                    to='#'
                                >
                                    Logout
                                </BaseStyledLink>
                            </Modal.Open>
                            <Modal.Window name='logout'>
                                <Modal.Header>Logout</Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to logout?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Modal.Close variation='secondary'>
                                        Cancel
                                    </Modal.Close>
                                    <Modal.Close
                                        variation='danger'
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </Modal.Close>
                                </Modal.Footer>
                            </Modal.Window>
                        </Modal>
                    </li>
                </MenuList>
            )}
        </div>
    );
}

export default UserMenu;
