import styled from 'styled-components';

const ImgContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    aspect-ratio: ${(props) => (props.$isBanner ? '10/4' : '400/250')};
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default ImgContainer;
