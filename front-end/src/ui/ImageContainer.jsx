import styled from 'styled-components';

const ImageContainer = styled.div`
    background-color: transparent;
    height: 100%;
    width: ${(props) => (props.$width ? `${props.$width}px` : '100%')};
    overflow: hidden;
    aspect-ratio: ${(props) => (props.$ratio ? props.$ratio : '1')};
    img {
        width: 100%;
        height: 100%;
        object-fit: ${(props) => (props.$fit ? props.$fit : 'cover')};
    }
`;

export default ImageContainer;
