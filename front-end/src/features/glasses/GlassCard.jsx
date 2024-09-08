import styled from 'styled-components';
import BaseStyledLink from '../../ui/Link';
import {
    countDiscount,
    formatPrice,
    formatSoldAmount,
} from '../../utils/helperFunction';

const CardContainer = styled.div`
    border: none;
    &:hover {
        border: 2px solid var(--color-sky-700);
        .btn-buying {
            transform: translate(-50%, -100%);
            opacity: 1;
        }
    }
    position: relative;
    transition: all 0s;
    height: 100%;
    color: var(--color-const-grey-800);
    .dark-mode & {
        filter: brightness(0.95);
    }
`;

const CardImage = styled.div`
    width: 100%;
    aspect-ratio: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const CardTitle = styled.p`
    font-size: 1.6rem;
    line-height: 22px;
    font-weight: 500;
    display: block;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CardBuy = styled(BaseStyledLink)`
    background-color: var(--color-sky-600);
    color: var(--color-const-grey-100);
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, 50%);
    text-transform: uppercase;
    font-size: 1.4rem;
    border-radius: 30px;
    padding: 0.8rem 1.4rem;
    opacity: 0;
    border: 1px solid transparent;

    &:hover {
        background-color: var(--color-const-grey-0);
        color: var(--color-const-grey-800);
        border: 1px solid var(--color-sky-600);
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
    background-color: var(--color-sky-200);
`;

const CardPrice = styled.div`
    font-size: 1.4rem;
    .text-decoration-line-through {
        text-decoration: 2px line-through red !important;
    }
`;

const CardSold = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.3rem 0.5rem;
    background-color: var(--color-const-grey-300);
    z-index: 100;
`;

function GlassCard({ item }) {
    return (
        <CardContainer className='card'>
            <div className='position-relative z-1 h-100'>
                {item.discount !== 0 && (
                    <CardDiscount>-{item.discount}%</CardDiscount>
                )}
                <CardSold>sold {formatSoldAmount(item.soldQuantity)}</CardSold>

                <CardImage>
                    <img
                        src={item.thumbnail}
                        className='card-img-top'
                        alt={item.title}
                    />
                </CardImage>
                <CardBuy href='' className='btn-buying'>
                    Buy Now
                </CardBuy>
            </div>

            <CardBody className='card-body'>
                <CardTitle className='card-title mt-2 mb-4'>
                    {item.title}
                </CardTitle>
                <CardPrice className='card-text d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center w-100'>
                        {item.discount !== 0 ? (
                            <>
                                <h4 className='text-decoration-line-through'>
                                    {formatPrice(item.price)}đ
                                </h4>
                                <h3 className='text-danger'>
                                    {formatPrice(
                                        countDiscount(item.price, item.discount)
                                    )}
                                    đ
                                </h3>
                            </>
                        ) : (
                            <h4>{formatPrice(item.price)}đ</h4>
                        )}
                    </div>
                </CardPrice>
            </CardBody>
        </CardContainer>
    );
}

export default GlassCard;
