import styled from 'styled-components';

const StyledSpinner = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;

function Spinner({ children }) {
    return (
        <StyledSpinner className='d-flex justify-content-center align-items-center'>
            {children}
        </StyledSpinner>
    );
}

export default Spinner;
