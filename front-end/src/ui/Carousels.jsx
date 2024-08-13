import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import ImgContainer from './ImageContainer';

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
        speed: 3000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: isBanner,
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
