import { HiOutlineUser } from 'react-icons/hi2';
import { exactNameFromEmail } from '../../utils/helperFunction';
import useUser from '../authentication/useUser';
import Dropdown from '../../ui/Dropdown';

function UserMenu() {
    const { user } = useUser();
    const name = exactNameFromEmail(user.email);

    return (
        <div className='d-flex justify-content-end align-items-center'>
            <Dropdown
                linkText={
                    <>
                        <HiOutlineUser />
                        {name}
                    </>
                }
                items={[
                    {
                        link: '/user/profile',
                        text: 'Profile',
                    },
                    {
                        link: '/user/logout',
                        text: 'Log out',
                    },
                ]}
            />
        </div>
    );
}

export default UserMenu;
