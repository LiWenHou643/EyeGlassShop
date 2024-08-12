import { listUsers } from '../services/UserApi';
import { useEffect } from 'react';
import Carousels from '../ui/Carousels';

function Home() {
    useEffect(() => {
        listUsers()
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Carousels />
        </div>
    );
}

export default Home;
