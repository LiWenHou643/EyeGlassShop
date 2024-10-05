import styled from 'styled-components';
import ProfileForm from '../features/user/ProfileForm';

const Container = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;
function Profile() {
    return (
        <Container>
            <ProfileForm />
        </Container>
    );
}

export default Profile;
