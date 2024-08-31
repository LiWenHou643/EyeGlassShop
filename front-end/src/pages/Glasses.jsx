import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin-top: 20rem;
`;
function Glasses() {
    return (
        <StyledContainer className='container'>
            <Outlet />
        </StyledContainer>
    );
}

export default Glasses;
