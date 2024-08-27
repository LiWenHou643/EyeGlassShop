import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import useUser from '../authentication/useUser';
import { exactNameFromEmail } from '../../utils/helperFunction';
import styled from 'styled-components';
import BaseStyledLink from '../../ui/Link';

const MenuList = styled.ul`
    background-color: var(--color-grey-900);
    width: 120px;
    z-index: 1000;

    li {
        padding: 0.5rem 1rem;

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
                        <BaseStyledLink className='dropdown-item' href='#'>
                            Profile
                        </BaseStyledLink>
                    </li>
                    <li>
                        <BaseStyledLink className='dropdown-item' href='#'>
                            Settings
                        </BaseStyledLink>
                    </li>
                    <li>
                        <BaseStyledLink className='dropdown-item' href='#'>
                            Logout
                        </BaseStyledLink>
                    </li>
                </MenuList>
            )}
        </div>
    );
}

export default UserMenu;
