import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { BarLoader, RingLoader } from 'react-spinners';
import styled from 'styled-components';
import CartItem from '../features/cart/CartItem';
import { useCart } from '../features/cart/useCart';
import { useCartCtx } from '../hooks/useCartCtx';
import { useCode } from '../hooks/useCode';
import Button from '../ui/Button';
import EmptyData from '../ui/EmptyData';
import Error from '../ui/Error';
import Form from '../ui/Form';
import Loading from '../ui/Loading';
import { formatPrice } from '../utils/helperFunction';

function Cart() {
    const navigate = useNavigate();
    const { isLoading, isFetching, data: cartItems, count, error } = useCart();
    const { totalPrice, setTotalPrice, promoCode, setPromoCode } = useCartCtx();
    const { checkCode, isChecking, error: invalidCode } = useCode();
    const [discount, setDiscount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [codeValue, setCodeValue] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        if (Array.isArray(cartItems)) {
            const total = cartItems.reduce((acc, item) => {
                if (checkedItems[item.id]) {
                    return acc + item.totalPrice;
                }
                return acc;
            }, 0);
            setSubtotal(total);
        }
        setDiscount(codeValue ? (codeValue / 100) * subtotal : 0);
        setTotalPrice(subtotal - discount);
    }, [
        checkedItems,
        cartItems,
        subtotal,
        discount,
        codeValue,
        setTotalPrice,
        setDiscount,
    ]);

    const isCheckoutDisabled = () => {
        return !Object.values(checkedItems).some(Boolean); // Check if any items are checked
    };

    if (isLoading)
        return (
            <Loading>
                <RingLoader color='blue' />
            </Loading>
        );
    if (error) return <Error>Error: {error.message}</Error>;
    if (!isLoading && !isFetching && count === 0)
        return <EmptyData resourceName={'products'} />;

    const handlePromoCodeChange = async (e) => {
        const code = e.target.value;
        setPromoCode(code);
        setIsTyping(true);
        setCodeValue(0);
        setDiscount(0);
        setTotalPrice(subtotal);
    };

    const handlePromoCodeSubmit = async (e) => {
        e.preventDefault();
        if (promoCode === '') return;
        setIsTyping(false);
        try {
            const response = await checkCode(promoCode);
            const value = response.data.value;
            setCodeValue(value);
            const discountValue = (value / 100) * subtotal;
            setDiscount(discountValue);
            setTotalPrice(
                subtotal - discountValue < 0 ? 0 : subtotal - discountValue
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);

        // Update all items in checkedItems state
        const updatedCheckedItems = {};
        cartItems.forEach((item) => {
            updatedCheckedItems[item.id] = checked;
        });
        setCheckedItems(updatedCheckedItems);
    };

    const handleItemChange = (itemId) => {
        // Update the checked state of the specific item
        setCheckedItems((prev) => {
            const updated = {
                ...prev,
                [itemId]: !prev[itemId], // Toggle checked state for the specific item
            };
            // Check if any item is unchecked to update selectAll
            const allChecked = Object.values(updated).every(Boolean);
            setSelectAll(allChecked);
            return updated;
        });
    };

    const handleCheckout = () => {
        // Gather selected items
        // const selectedItems = cartItems.filter(
        //     (cartItem) => checkedItems[cartItem.id]
        // );
        // console.log(selectedItems);

        console.log('Checkout', totalPrice);
        // Navigate to the checkout page with the selected items
        navigate('/checkout', {
            state: { totalPrice, discount, codeValue, subtotal, promoCode },
        });
    };

    const checkedCount = Object.values(checkedItems).reduce(
        (acc, cur) => (cur ? acc + 1 : acc),
        0
    );

    return (
        <StyledContainer>
            <div className='p-5 row'>
                <div className='col-12 col-xl-9'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h1>Shopping Cart</h1>
                        {isFetching && (
                            <Loading>
                                <BarLoader />
                            </Loading>
                        )}
                        <h1>
                            {count > 1 ? count + ' Items' : count + ' Item'}
                        </h1>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='form-check form-check-inline mb-2 fs-3'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                id='inlineCheckbox'
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                            <label
                                className='form-check-label'
                                htmlFor='inlineCheckbox'
                            >
                                Select all
                            </label>
                        </div>
                        <div>
                            {checkedCount > 0 ? (
                                <span>
                                    {checkedCount} item
                                    {checkedCount > 1 ? 's' : ''} selected
                                </span>
                            ) : (
                                <span>No selected items</span>
                            )}
                        </div>
                    </div>
                    <div className='row justify-content-between align-items-start'>
                        <ul>
                            {cartItems.length > 0 &&
                                cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        $key={item.id}
                                        item={item}
                                        isChecked={checkedItems[item.id]} // Pass checked state
                                        onChange={handleItemChange} // Pass change handler
                                    />
                                ))}
                        </ul>
                    </div>
                </div>
                <div className='col-12 col-xl-3 d-flex d-xl-block justify-content-end mt-5 mt-xl-0 ps-5'>
                    <div>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h1>Order Summary</h1>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <h4>Subtotal: {formatPrice(subtotal) + ' VND'}</h4>
                        </div>
                        <hr />
                        <Form onSubmit={handlePromoCodeSubmit}>
                            <div className='input-group mb-2'>
                                <input
                                    type='text'
                                    className='form-control fs-4 py-2 border-0 rounded-0'
                                    placeholder='Promotion code'
                                    aria-label='RPromotion code'
                                    aria-describedby='button-addon2'
                                    value={promoCode}
                                    onChange={handlePromoCodeChange}
                                />
                                <Button
                                    id='button-addon2'
                                    $variation='secondary'
                                    className='fs-4 py-2 border-0 rounded-0'
                                    disabled={isChecking}
                                >
                                    {isChecking ? 'Checking' : 'Apply'}
                                </Button>
                            </div>
                        </Form>
                        <div className='mb-2 fs-4'>
                            {!isTyping && invalidCode ? (
                                <Error className='text-start'>
                                    {invalidCode.message}
                                </Error>
                            ) : !isTyping && !invalidCode && codeValue ? (
                                <p className='text-success'>
                                    Applied successfully
                                </p>
                            ) : null}
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h4>Discount: {codeValue}%</h4>
                            <h4>- {formatPrice(discount)} VND</h4>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <h3>Total: {formatPrice(totalPrice) + ' VND'}</h3>
                        </div>
                        <Button
                            className='mt-3 w-100 fs-2'
                            onClick={handleCheckout}
                            disabled={isCheckoutDisabled()}
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
            background: var(--color-grey-300);
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
