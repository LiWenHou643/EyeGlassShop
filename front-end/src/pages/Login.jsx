import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';

const StyledContainer = styled.div`
    min-height: 600px;

    margin-top: 100px;
    @media (min-width: 1024px) {
        margin-top: 270px;
    }
`;
const FormContainer = styled.div`
    margin: 50px auto;
    width: 400px;
    padding: 30px;

    @media (min-width: 768px) {
        width: 500px;
        padding: 50px;
    }

    @media (min-width: 1024px) {
        width: 600px;
    }
`;

export default function Login() {
    return (
        <StyledContainer>
            <FormContainer className='d-flex flex-column justify-content-around align-items-center shadow-lg gap-4'>
                <h1 className='display-3 mb-4'>Log In</h1>

                <LoginForm />
            </FormContainer>
        </StyledContainer>
    );
}
