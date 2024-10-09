import styled from 'styled-components';
import ProfileForm from '../features/user/ProfileForm';

function Profile() {
    return (
        <Container>
            <ProfileForm />
        </Container>
    );
}

export default Profile;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1000px;

    > div {
        border-radius: 4rem;
        position: relative;
        overflow: hidden;
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--color-grey-300);
            opacity: 0.6;
            z-index: 1;
        }
        & > * {
            position: relative;
            z-index: 2;
        }
    }
`;
