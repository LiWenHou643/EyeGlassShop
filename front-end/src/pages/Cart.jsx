import styled from 'styled-components';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import EmptyData from '../ui/EmptyData';
import { useCart } from '../features/cart/useCart';
import { RingLoader } from 'react-spinners';
import CartItem from '../features/cart/CartItem';
import { formatPrice } from '../utils/helperFunction';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { useCartCtx } from '../hooks/useCartCtx';
import Form from '../ui/Form';

function Cart() {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { isLoading, isFetching, data, count, error } = useCart();
    const { totalPrice, promoCode, setPromoCode } = useCartCtx();
    const [discount, setDiscount] = useState(0);
    if (isLoading || isFetching)
        return (
            <Loading>
                <RingLoader color='blue' />
            </Loading>
        );
    if (error) return <Error>Error: {error.message}</Error>;
    if (!isFetching && count === 0)
        return <EmptyData resourceName={'products'} />;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handlePromoCodeChange = async (e) => {
        const code = e.target.value;
        setPromoCode(code); // Update context with the promo code

        if (code) {
            try {
                // Replace with your actual API endpoint
                // const response = await axiosPrivate.post(
                //     '/api/validate-promo-code',
                //     { code }
                // );
                // setDiscount(response);
                console.log('Discount:', code);
            } catch (error) {
                console.error('Error validating promo code:', error);
            }
        } else {
            setDiscount(0); // Reset discount if no code is entered
        }
    };

    return (
        <StyledContainer>
            <div className='p-5 row'>
                <div className='col-12 col-xl-9'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h1>Shopping Cart</h1>
                        <h1>
                            {count > 1 ? count + ' Items' : count + ' Item'}
                        </h1>
                    </div>
                    <hr />
                    <div className='form-check form-check-inline mb-2 fs-3'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id='inlineCheckbox1'
                            value='option1'
                        />
                        <label
                            className='form-check-label'
                            htmlFor='inlineCheckbox1'
                        >
                            Select all
                        </label>
                    </div>
                    <div className='row justify-content-between align-items-start'>
                        <ul>
                            {data &&
                                data.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                        </ul>
                    </div>
                </div>
                <div className='col-12 col-xl-3 d-flex d-xl-block justify-content-end  mt-5 mt-xl-0 ps-4'>
                    <div>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h1>Order Summary</h1>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <h4>
                                Subtotal:{' '}
                                {formatPrice(
                                    data.reduce(
                                        (acc, cur) => acc + cur.totalPrice,
                                        0
                                    )
                                ) + ' VND'}
                            </h4>
                        </div>
                        <hr />
                        <Form>
                            <div className='input-group mb-3'>
                                <input
                                    type='text'
                                    className='form-control fs-4 py-2 border-0 rounded-0'
                                    placeholder='Promotion code'
                                    aria-label='RPromotion code'
                                    aria-describedby='button-addon2'
                                    value={promoCode}
                                    onChange={handlePromoCodeChange}
                                />
                                <Button id='button-addon2' $variation=''>
                                    Button
                                </Button>
                            </div>
                        </Form>
                        <div className='d-flex justify-content-between'>
                            <h4>Discount: {discount}%</h4>
                            <h4>
                                -{' '}
                                {formatPrice(
                                    discount *
                                        data.reduce(
                                            (acc, cur) => acc + cur.totalPrice,
                                            0
                                        )
                                )}{' '}
                                VND
                            </h4>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <h3>
                                Total:{' '}
                                {formatPrice(
                                    data.reduce(
                                        (acc, cur) => acc + cur.totalPrice,
                                        0
                                    )
                                ) + ' VND'}
                            </h3>
                        </div>
                        <Button
                            className='mt-3 w-100 fs-2'
                            onClick={handleCheckout}
                        >
                            Checkout <HiArrowRight className='mb-1' />
                        </Button>
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;

    > div {
        border-radius: 4rem;
        position: relative;
        overflow: hidden;
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--color-grey-400);
            opacity: 0.6;
            z-index: 1;
        }
        & > * {
            position: relative;
            z-index: 2;
        }
    }
`;

export default Cart;
