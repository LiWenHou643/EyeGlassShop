import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;

function Product() {
    return (
        <Container className='container'>
            <Outlet />
        </Container>
    );
}

export default Product;
