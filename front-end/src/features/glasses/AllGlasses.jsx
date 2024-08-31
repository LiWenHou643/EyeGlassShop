import { data } from './glassesData';
import { styled } from 'styled-components';
import { countDiscount } from '../../utils/helperFunction';
import { HiOutlineStar } from 'react-icons/hi2';
import BaseStyledLink from '../../ui/Link';
const CardContainer = styled.div`
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

        .btn-buying {
            transform: translate(-50%, -100%);
            opacity: 1;
        }
    }
    position: relative;
    transition: all 0.3s;
`;

const CartBody = styled.div`
    order: 1;
`;

const CardImage = styled.div`
    position: relative;
`;

const CardTitle = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
`;

const CardBuy = styled(BaseStyledLink)`
    background-color: var(--color-grey-800);
    color: var(--color-grey-100);
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, 50%);
    text-transform: uppercase;
    font-size: 1.6rem;
    border-radius: 30px;
    padding: 0.8rem 1.4rem;
    opacity: 0;
    border: 1px solid transparent;

    &:hover {
        background-color: var(--color-grey-0);
        color: var(--color-grey-800);
        border: 1px solid var(--color-grey-800);
    }

    transition: all 0.3s;
`;
const CardDiscount = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.3rem 0.5rem;
    background-color: var(--color-red-100);
    color: var(--color-red-700);
    z-index: 100;
`;

const CardPrice = styled.div`
    font-size: 1.4rem;
    .text-decoration-line-through {
        text-decoration: 2px line-through red !important;
    }
`;

const AfterDiscount = styled.h2`
    position: absolute;
    left: 6rem;
    bottom: 0.6rem;
`;

function AllGlasses() {
    return (
        <div className='row justify-content-around row-gap-5'>
            {data.map((item) => {
                return (
                    <div
                        key={item.id}
                        className=' col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2 px-3'
                    >
                        <CardContainer className='card'>
                            <div className='position-relative z-1'>
                                {item.discount !== 0 && (
                                    <CardDiscount>
                                        -{item.discount}%
                                    </CardDiscount>
                                )}

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

                            <CartBody className='card-body'>
                                <CardTitle className='card-title mt-2 mb-4'>
                                    {item.title}
                                </CardTitle>
                                <CardPrice className='card-text d-flex justify-content-between align-items-center'>
                                    <div>
                                        {item.discount !== 0 ? (
                                            <>
                                                <h4 className='text-decoration-line-through'>
                                                    {item.price}$
                                                </h4>
                                                <AfterDiscount className='text-danger'>
                                                    {countDiscount(
                                                        item.price,
                                                        item.discount
                                                    )}
                                                    $
                                                </AfterDiscount>
                                            </>
                                        ) : (
                                            <h4>{item.price}$</h4>
                                        )}
                                    </div>

                                    <h4>
                                        {Array.from({ length: 5 }).map(
                                            (_, index) => (
                                                <HiOutlineStar key={index} />
                                            )
                                        )}
                                    </h4>
                                </CardPrice>
                            </CartBody>
                        </CardContainer>
                    </div>
                );
            })}
        </div>
    );
}

export default AllGlasses;
