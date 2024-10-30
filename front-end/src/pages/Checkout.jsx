import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { useCartCtx } from '../hooks/useCartCtx';
import { useCheckout } from '../hooks/useCheckout';
import { useCode } from '../hooks/useCode';
import { useUser } from '../hooks/useUser';
import Button from '../ui/Button';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import Select from '../ui/Select';
import { CURRENCY } from '../utils/constant';
import {
    calculateDeliveryCost,
    formatAddress,
    formatPrice,
    haversineDistance,
} from '../utils/helperFunction';

function Checkout() {
    const location = useLocation();
    const {
        subtotal = 0,
        discount = 0,
        promoCode = '',
        codeValue = 0,
        totalPrice,
        selectedCartItemIds,
    } = location.state || {}; // Safely access state
    const { setTotalPrice, setPromoCode, promoCode: code } = useCartCtx();
    const { checkCode, isChecking, error: invalidCode } = useCode();

    const [curCode, setCurCode] = useState(promoCode || code);
    const [localDiscount, setLocalDiscount] = useState(discount);
    const [localCodeValue, setLocalCodeValue] = useState(codeValue || null);
    const [isTyping, setIsTyping] = useState(false);
    const [total, setTotal] = useState(totalPrice);
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');

    const { data: user, isLoading } = useUser();

    const [distance, setDistance] = useState(null);
    const [deliveryCost, setDeliveryCost] = useState(0);

    useEffect(() => {
        if (!user || !user.address) return;

        const calculateDistance = async () => {
            try {
                const distance = await haversineDistance(user.address); // Assuming this function returns coordinates
                const cost = await calculateDeliveryCost(distance);
                setAddress(formatAddress(user.address));
                setDistance(distance);
                setDeliveryCost(cost);
                setTotal(subtotal + cost - localDiscount);
            } catch (error) {
                console.error('Error calculating distance:', error);
            }
        };

        calculateDistance();
    }, [user, deliveryCost, subtotal, localDiscount]);

    const { checkout, isCheckingOut } = useCheckout();

    const handleSubmitCheckout = () => {
        checkout({
            personId: user.id,
            promoCode: curCode,
            shippingAddress: address,
            paymentMethod: paymentMethod,
            selectedCartItems: selectedCartItemIds,
        });
    };

    const handlePromoCodeChange = async (e) => {
        const code = e.target.value;
        setPromoCode(code);
        setCurCode(code);
        setIsTyping(true);
        setLocalCodeValue(null);
        setLocalDiscount(0);
        setTotalPrice(subtotal);
    };

    const handlePromoCodeSubmit = async (e) => {
        e.preventDefault();
        console.log('Checking promo code:', curCode);
        if (curCode === '') return;
        setIsTyping(false);
        try {
            const response = await checkCode(curCode);
            console.log('Response:', response);
            const value = response.data.value;
            setLocalCodeValue(value);
            const discountValue = (value / 100) * subtotal;
            setLocalDiscount(discountValue);
            setTotalPrice(
                subtotal - discountValue < 0 ? 0 : subtotal - discountValue
            );
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <Loading>
                <RingLoader color='blue' />
            </Loading>
        );
    }

    const calculatingShipCost =
        user.address == null || !distance ? true : false;
    return (
        <div className='container-lg' style={{ maxWidth: '1000px' }}>
            <h1 className='text-center text-capitalize'>Payment</h1>
            <div className='row shadow p-5 mt-5'>
                <div className='col-12 col-lg-4 shadow rounded p-4 bg-light h-50'>
                    <h2 className='mb-3 text-bg-light'>Customer Details</h2>
                    <div className='shipment-details'>
                        <p className='mb-2 text-bg-light'>
                            <strong>Name:</strong> {user.fullName}
                        </p>
                        <p className='mb-2 text-bg-light'>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className='mb-2 text-bg-light'>
                            <strong>Phone:</strong> {user.phoneNumber}
                        </p>
                        <p className='mb-2 text-bg-light'>
                            <strong>Address:</strong>{' '}
                            {formatAddress(user.address)}
                        </p>
                    </div>
                </div>

                <div className='col-12 col-lg-8 px-5 mt-5 mt-lg-0'>
                    <div className='row mb-4'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <label htmlFor='code' className='form-label'>
                                Promotion code:
                            </label>
                        </div>
                        <div className='col-12 col-md-8 col-lg-8'>
                            <div className='input-group mb-2'>
                                <form
                                    onSubmit={handlePromoCodeSubmit}
                                    className='d-flex w-100'
                                >
                                    <input
                                        type='text'
                                        name='code'
                                        className='form-control fs-4 py-2 border-0 rounded-0'
                                        placeholder='Promotion code'
                                        aria-label='Promotion code'
                                        aria-describedby='button-addon2'
                                        value={curCode}
                                        onChange={handlePromoCodeChange}
                                        disabled={isChecking || isCheckingOut}
                                    />
                                    <Button
                                        id='button-addon2'
                                        $variation='secondary'
                                        className='fs-4 py-2 border-0 rounded-0'
                                        disabled={isChecking}
                                    >
                                        {isChecking ? 'Checking' : 'Apply'}
                                    </Button>
                                </form>
                                <div className='mb-2 fs-4'>
                                    {!isTyping && invalidCode ? (
                                        <Error className='text-start'>
                                            {invalidCode.message}
                                        </Error>
                                    ) : !isTyping &&
                                      !invalidCode &&
                                      localCodeValue ? (
                                        <p className='text-success'>
                                            {localCodeValue}% discount applied
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <label htmlFor='address' className='form-label'>
                                Payment methods:
                            </label>
                        </div>
                        <div className='col-12 col-md-8 col-lg-8'>
                            <Select
                                className='form-select'
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                disabled={isCheckingOut}
                            >
                                <option value='CASH_ON_DELIVERY'>
                                    Cash on delivery
                                </option>
                                <option value='PAYPAL'>Paypal</option>
                            </Select>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            Delivery cost:
                        </div>
                        <div className='col-12 col-md-8 col-lg-8'>
                            <span>
                                {user.address !== null
                                    ? distance
                                        ? `${distance} km`
                                        : 'Calculating...'
                                    : 'Address is required for delivery'}
                            </span>
                            {distance !== null && (
                                <span className='ms-2'>
                                    {distance < 1 ? (
                                        <span className='text-success'>
                                            Free shipping available!
                                        </span>
                                    ) : (
                                        <span>
                                            | Shipping cost applies for
                                            distances greater than 1 km.
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-12 col-md-4 col-lg-4'></div>
                        <div className='col-12 col-md-8 col-lg-8'>
                            <div className='d-flex justify-content-end gap-3'>
                                <div>
                                    <p className='mb-1 text-end'>Subtotal: </p>
                                    <p className='mb-1 text-end'>
                                        Delivery cost:{' '}
                                    </p>
                                    <p className='mb-1 text-end'>Discount: </p>
                                </div>
                                <div>
                                    <p className='mb-1 text-end'>
                                        {formatPrice(subtotal) + CURRENCY}
                                    </p>
                                    <p className='mb-1 text-end'>
                                        {formatPrice(deliveryCost) + CURRENCY}
                                    </p>
                                    <p className='mb-1 text-end'>
                                        {'- ' +
                                            formatPrice(localDiscount) +
                                            CURRENCY}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p className='mb-1 text-end'>
                                Total: {formatPrice(total) + CURRENCY}
                            </p>
                        </div>
                    </div>

                    <div className='row mt-4 d-flex justify-content-between'>
                        <Button
                            $variation='secondary'
                            type='reset'
                            className='col-3 py-3 text-capitalize'
                            disabled={isCheckingOut}
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleSubmitCheckout}
                            className='col-5 py-3 text-capitalize'
                            disabled={isCheckingOut || calculatingShipCost}
                        >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
