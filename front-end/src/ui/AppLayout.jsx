import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function AppLayout() {
    return (
        <div>
            <Header />

            <Main className='container'>
                <Outlet />
            </Main>

            <Footer />
        </div>
    );
}

export default AppLayout;
