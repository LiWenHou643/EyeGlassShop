import { createContext, useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Section from '../../ui/Section';
import ProductCard from './ProductCard';

const ProductSliderContext = createContext();

function ProductSlider({ children }) {
    const [slidesToShow, setSlidesToShow] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(2);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(4);
            } else {
                setSlidesToShow(6);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ProductSliderContext.Provider
            value={{ slidesToShow, setSlidesToShow }}
        >
            <Section>{children}</Section>
        </ProductSliderContext.Provider>
    );
}

function Title({ children }) {
    return <h1 className='mt-5 mb-3'>{children}</h1>;
}

function Products({ products }) {
    const { slidesToShow } = useContext(ProductSliderContext);

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        swipeToSlide: true,
    };

    return (
        <Slider {...settings}>
            {products.map((item, index) => (
                <ProductCard key={index} item={item} isSlider />
            ))}
        </Slider>
    );
}

ProductSlider.Title = Title;
ProductSlider.Products = Products;

export { ProductSlider };
