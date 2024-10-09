import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ImageContainer from '../../ui/ImageContainer';
import BaseStyledLink from '../../ui/Link';
import {
    countDiscount,
    formatPrice,
    formatSoldAmount,
} from '../../utils/helperFunction';

function ProductCard({ item, isSlider }) {
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`/products/${item.id}`);
    };
    return (
        <CardContainer
            className='card'
            $isSlider={isSlider}
            onClick={handleClickCard}
            $soldout={item.stockQuantity === 0}
        >
            <div className='position-relative z-1 h-100'>
                {item.discount !== 0 && (
                    <CardDiscount>-{item.discount}%</CardDiscount>
                )}
                <CardSold>sold {formatSoldAmount(item.soldQuantity)}</CardSold>

                <ImageContainer $ratio='11/9' $fit='contain'>
                    <img
                        src={item.image}
                        className='card-img-top'
                        alt={item.title}
                    />
                </ImageContainer>
                <CardBuy href='' className='btn-buying'>
                    Buy Now
                </CardBuy>
            </div>

            <CardBody className='card-body'>
                <CardTitle className='card-title'>{item.title}</CardTitle>
                <CardPrice className='card-text d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center w-100'>
                        {item.discount !== 0 ? (
                            <>
                                <h4 className='text-decoration-line-through mb-0'>
                                    {formatPrice(item.price)}d
                                </h4>
                                <h4 className='text-danger mb-0'>
                                    {formatPrice(
                                        countDiscount(item.price, item.discount)
                                    )}
                                    d
                                </h4>
                            </>
                        ) : (
                            <h4 className='mb-0'>{formatPrice(item.price)}d</h4>
                        )}
                    </div>
                </CardPrice>
            </CardBody>
        </CardContainer>
    );
}

export default ProductCard;

const CardContainer = styled.div`
    border: none;
    position: relative;
    transition: all 0s;
    color: var(--color-const-grey-800);
    cursor: pointer;

    .dark-mode & {
        filter: brightness(0.85);
    }

    &:hover {
        .btn-buying {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }

    border-right: ${(props) =>
        props.$isSlider ? '1px solid var(--color-pink-300)' : 'none'};

    &:before {
        content: ${(props) => (props.$soldout ? "'Sold out'" : "''")};
        text-transform: uppercase;
        font-size: 4rem;
        position: absolute;
        inset: 0;
        background: var(--color-grey-400);
        opacity: ${(props) => (props.$soldout ? 0.6 : 0)};
        z-index: 100;
        transition: opacity 0.3s ease; // Optional: Add a transition for a smoother effect
    }
`;

const CardTitle = styled.p`
    font-size: 1.6rem;
    line-height: 16px;
    font-weight: 500;
    text-decoration: none;
    margin: 0.6rem 0 !important;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CardBuy = styled(BaseStyledLink)`
    background-color: var(--color-pink-200);
    color: var(--color-const-grey-900);
    position: absolute;
    bottom: 16px;
    width: 65%;
    left: 50%;
    top: 50%;
    height: 40px;
    transform: translate(-50%, 100%);
    text-transform: uppercase;
    font-size: 1.4rem;
    border-radius: 30px;
    padding: 0.8rem 1.4rem;
    opacity: 0;
    text-align: center;
    border: 1px solid transparent;

    &:hover {
        background-color: var(--color-const-grey-0);
        color: var(--color-const-grey-800);
        border: 1px solid var(--color-pink-300);
    }

    transition: all 0.3s;
`;

const CardDiscount = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.3rem 0.5rem;
    background-color: var(--color-red-300);
    color: var(--color-red-700);
    z-index: 100;
`;

const CardBody = styled.div`
    background-color: var(--color-pink-200);
    color: var(--color-const-grey-900);
`;

const CardPrice = styled.div`
    font-size: 1.4rem;
`;

const CardSold = styled.div`
    position: absolute;
    font-size: 1.4rem;
    bottom: 0;
    left: 0;
    padding: 0.3rem 0.5rem;
    background-color: var(--color-const-grey-200);
    z-index: 100;
`;
