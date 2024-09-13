import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    capitalizeFirstLetter,
    countDiscount,
    formatPrice,
    formatSoldAmount,
} from '../../utils/helperFunction';
import { useProduct } from './useProduct';
import Loading from '../../ui/Loading';
import ImageContainer from '../../ui/ImageContainer';
import Button from '../../ui/Button';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import NumberInput from '../../ui/NumberInput';

const StyledContainer = styled.div`
    padding: 2rem 4rem;
    border-radius: 2rem;
    @media (min-width: 1200px) {
        padding: 6rem;
    }
    @media (min-width: 1400px) {
        padding: 6rem 15rem;
    }
`;

const ProductContainer = styled.div`
    padding: 4rem 2rem;
    color: var(--color-grey-900);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
`;

const StyledReview = styled.div`
    background-color: var(--color-grey-200);
`;

function ProductDetails() {
    const { id } = useParams();
    const [numberValue, setNumberValue] = useState(1);

    const handleValueChange = (newValue) => {
        setNumberValue(newValue);
    };

    const { data: product, isLoading, error } = useProduct(id);

    if (isLoading) {
        return <Loading>Loading...</Loading>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <StyledContainer className='bg-light-opacity'>
            <nav className='mb-3' aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link className='text-decoration-underline' to='/'>
                            Home
                        </Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link
                            className='text-decoration-underline'
                            to='/products'
                        >
                            Products
                        </Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link
                            className='text-decoration-underline'
                            to={`/products?category=${product.category}`}
                        >
                            {capitalizeFirstLetter(product.category)}
                        </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        {capitalizeFirstLetter(product.title)}
                    </li>
                </ol>
            </nav>
            <ProductContainer className='row'>
                <div className='col-12 col-md-5'>
                    <ImageContainer className='rounded-3' $fit='fill'>
                        <img src={product.image} alt={product.title} />
                    </ImageContainer>
                </div>
                <div className='col-12 col-md-7 py-4 py-md-0 ps-lg-5'>
                    <div className='h-100 d-flex flex-column justify-content-between'>
                        <h1>{product.title}</h1>
                        <p>
                            Product code: <strong>{product.productCode}</strong>
                        </p>
                        <div className='d-flex my-3 justify-content-start gap-4'>
                            <div className='d-flex align-items-end border-end border-secondary pe-4'>
                                <h3 className='mb-0 text-decoration-underline'>
                                    4.6
                                </h3>
                                <div className='ms-2'>
                                    <StarRatings
                                        starRatedColor='#E0610DFF'
                                        starHoverColor='#E0610DFF'
                                        starEmptyColor='#999999FF'
                                        rating={4.6}
                                        starDimension='2.4rem'
                                        starSpacing='0.1rem'
                                    />
                                </div>
                            </div>
                            <div className='d-flex align-items-end border-end border-secondary pe-4'>
                                <h3 className='mb-0'>
                                    {formatSoldAmount(3987)} ratings
                                </h3>
                            </div>
                            <div className='d-flex align-items-end'>
                                <h3 className='mb-0'>
                                    {formatSoldAmount(product.soldQuantity)}{' '}
                                    sold
                                </h3>
                            </div>
                        </div>
                        <div className='d-flex align-items-center w-100 justify-content-start py-4'>
                            {product.discount > 0 ? (
                                <>
                                    <span>
                                        <h2 className='text-secondary text-decoration-line-through mb-0'>
                                            {formatPrice(product.price)}d
                                        </h2>
                                    </span>
                                    <span>
                                        <h1 className='fw-bolder ps-5 pe-3 mb-0'>
                                            {formatPrice(
                                                countDiscount(
                                                    product.price,
                                                    product.discount
                                                )
                                            )}
                                            d
                                        </h1>
                                    </span>
                                    <span className='badge bg-danger'>
                                        -{product.discount}%
                                    </span>
                                </>
                            ) : (
                                <h1 className='fw-bolder mb-0'>
                                    ${formatPrice(product.price)}
                                </h1>
                            )}
                        </div>
                        <div>
                            <span>Product return policy: </span>
                            <span className='ms-2'>30 days for free</span>
                        </div>
                        <div>
                            <span>Warranty: </span>
                            <span className='ms-2'>12 months</span>
                        </div>
                        <p>{product.description}</p>
                        <div className='d-flex align-items-center gap-4'>
                            <NumberInput onChange={handleValueChange} />
                            <span>
                                <span>Stock: </span>
                                <span>{product.stockQuantity}</span>
                            </span>
                        </div>
                        <div className='d-flex gap-4 mt-3'>
                            <Button>Add to cart</Button>
                            <Button>Buy now</Button>
                        </div>
                    </div>
                </div>
            </ProductContainer>

            <div className='row my-5'>
                <h1>Detail</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                    augue semper porta. Mauris massa. Vestibulum lacinia arcu
                    eget nulla. Class aptent taciti sociosqu ad litora torquent
                    per conubia nostra, per inceptos himenaeos. Curabitur
                    sodales ligula in libero. Sed dignissim lacinia nunc.
                    Curabitur tortor. Pellentesque nibh. Aenean quam. In
                    scelerisque sem at dolor. Maecenas mattis. Sed convallis
                    tristique sem. Proin ut ligula vel nunc egestas porttitor.
                    Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
                    massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
                    ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,
                    euismod in, nibh. Quisque volutpat condimentum velit. Class
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia,
                    urna non tincidunt mattis, tortor neque adipiscing diam, a
                    cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla.
                    Suspendisse potenti. Nunc feugiat mi a tellus consequat
                    imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.
                    Suspendisse in justo eu magna luctus suscipit. Sed lectus.
                    Integer euismod lacus luctus magna. Quisque cursus, metus
                    vitae pharetra auctor, sem massa mattis sem, at interdum
                    magna augue eget diam. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae; Mor
                </p>
            </div>

            <div className='row my-5'>
                <h1>Description</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                    augue semper porta. Mauris massa. Vestibulum lacinia arcu
                    eget nulla. Class aptent taciti sociosqu ad litora torquent
                    per conubia nostra, per inceptos himenaeos. Curabitur
                    sodales ligula in libero. Sed dignissim lacinia nunc.
                    Curabitur tortor. Pellentesque nibh. Aenean quam. In
                    scelerisque sem at dolor. Maecenas mattis. Sed convallis
                    tristique sem. Proin ut ligula vel nunc egestas porttitor.
                    Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
                    massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
                    ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,
                    euismod in, nibh. Quisque volutpat condimentum velit. Class
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia,
                    urna non tincidunt mattis, tortor neque adipiscing diam, a
                    cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla.
                    Suspendisse potenti. Nunc feugiat mi a tellus consequat
                    imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.
                    Suspendisse in justo eu magna luctus suscipit. Sed lectus.
                    Integer euismod lacus luctus magna. Quisque cursus, metus
                    vitae pharetra auctor, sem massa mattis sem, at interdum
                    magna augue eget diam. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae; Mor
                </p>
            </div>

            <div className='row my-5'>
                <h1>Reviews</h1>
                <div className='d-flex justify-content-start'>
                    <div className='d-flex align-items-end border-end border-secondary pe-4'>
                        <h3 className='mb-0 text-decoration-underline'>4.6</h3>
                        <div className='ms-2'>
                            <StarRatings
                                starRatedColor='#E0610DFF'
                                starHoverColor='#E0610DFF'
                                starEmptyColor='#999999FF'
                                rating={4.6}
                                starDimension='2.4rem'
                                starSpacing='0.1rem'
                            />
                        </div>
                    </div>
                    <div className='d-flex align-items-end ps-4'>
                        <h3 className='mb-0'>
                            {formatSoldAmount(3987)} ratings
                        </h3>
                    </div>
                </div>
                <div className='my-5 d-flex flex-column gap-3'>
                    <StyledReview className='d-flex justify-content-start align-items-center gap-4 p-4'>
                        <div className='p-4'>
                            <ImageContainer $width='50'>
                                <img
                                    src='https://via.placeholder.com/150'
                                    alt='John Doe'
                                    className='rounded-circle'
                                />
                            </ImageContainer>
                        </div>
                        <div>
                            <h3 className='mb-0'>John Doe</h3>
                            <StarRatings
                                starRatedColor='#E0610DFF'
                                starHoverColor='#E0610DFF'
                                starEmptyColor='#999999FF'
                                rating={6}
                                starDimension='1.4rem'
                                starSpacing='0.1rem'
                            />
                            <p>
                                Great product i have ever seen! I will buy it
                                again.
                            </p>
                        </div>
                    </StyledReview>
                </div>
            </div>
        </StyledContainer>
    );
}

export default ProductDetails;
