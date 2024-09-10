import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Pagination from '../ui/Pagination';

const StyledContainer = styled.div`
    min-height: 600px;

    @media (min-width: 1024px) {
        margin-top: 200px;
    }
`;
const FormContainer = styled.div`
    &.container {
        width: 400px;
        margin: 50px auto;
        padding: 30px;
    }

    @media (min-width: 768px) {
        &.container {
            width: 500px;
            padding: 50px;
        }
    }

    @media (min-width: 1024px) {
        &.container {
            width: 600px;
        }
    }
`;

export default function Login() {
    return (
        <StyledContainer>
            <FormContainer className='container d-flex flex-column justify-content-around align-items-center shadow-lg gap-4'>
                <h1 className='display-3 mb-4'>Log In</h1>

                <LoginForm />
            </FormContainer>
        </StyledContainer>
    );
}
