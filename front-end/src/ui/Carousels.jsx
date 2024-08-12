import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const ImgContainer = styled.div`
    height: 100%;
    overflow: hidden;
    aspect-ratio: ${(props) => (props.$isBanner ? '10/4' : '400/250')};
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Title = styled.h3`
    overflow: hidden;
    height: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 10px 0;
    color: var(--color-grey-800);
    font-weight: 600;
`;
const Content = styled.p`
    overflow: hidden;
    height: 45px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: var(--color-grey-600);
`;

export default function Carousels({ data, isBanner }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <Slider {...settings}>
            {data?.map((item, index) => (
                <div key={index}>
                    <ImgContainer $isBanner={isBanner}>
                        <img src={item?.img ? item.img : item} alt='' />
                    </ImgContainer>

                    {item.title && (
                        <Title className='mt-2 mb-4'>{item.title}</Title>
                    )}

                    {item.content && <Content>{item.content}</Content>}
                </div>
            ))}
        </Slider>
    );
}
