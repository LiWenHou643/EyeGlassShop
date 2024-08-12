import styled from 'styled-components';
import SigninForm from '../features/authentication/SigninForm';

const StyledContainer = styled.div`
    min-height: 600px;
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

export default function Signin() {
    return (
        <StyledContainer>
            <FormContainer className='container d-flex flex-column justify-content-around align-items-center border border-success gap-4'>
                <h1 className='display-2 mb-4'>Sign In</h1>

                <SigninForm />
            </FormContainer>
        </StyledContainer>
    );
}
