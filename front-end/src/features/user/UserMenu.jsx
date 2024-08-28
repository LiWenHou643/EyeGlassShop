import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import useUser from '../authentication/useUser';
import { exactNameFromEmail } from '../../utils/helperFunction';
import styled from 'styled-components';
import BaseStyledLink from '../../ui/Link';
import Modal from '../../ui/Modal';
import { useLogout } from '../authentication/useLogout';

const MenuList = styled.ul`
    background-color: var(--color-grey-900);
    width: 120px;
    z-index: 1000;

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

const UserButton = styled.div`
    cursor: pointer;
`;

function UserMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useUser();
    const { logout } = useLogout();

    const isAdmin = user.role === 'admin';

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
                <p>{exactNameFromEmail(user.email)}</p>
            </UserButton>
            {showMenu && (
                <MenuList className='position-absolute top-100 rounded-3'>
                    <li>
                        <BaseStyledLink
                            className='dropdown-item py-2 px-4'
                            to={isAdmin ? '/admin/setting' : '/user/profile'}
                        >
                            {isAdmin ? 'Setting' : 'Profile'}
                        </BaseStyledLink>
                    </li>
                    <li>
                        <Modal>
                            <Modal.Open opens='logout'>
                                <BaseStyledLink
                                    className='dropdown-item py-2 px-4'
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
