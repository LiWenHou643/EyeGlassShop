import { useUser } from '../../hooks/useUser';
import { RingLoader } from 'react-spinners';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

function UserInfo() {
    const { isLoading, isFetching, data, error } = useUser();

    if (isLoading || isFetching)
        return (
            <Loading>
                <RingLoader color='blue' />
            </Loading>
        );
    if (error) return <Error>Error: {error.message}</Error>;

    console.log(data);
    return <div></div>;
}

export default UserInfo;
