import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;

function Product() {
    return (
        <StyledContainer>
            <Outlet />
        </StyledContainer>
    );
}

export default Product;
