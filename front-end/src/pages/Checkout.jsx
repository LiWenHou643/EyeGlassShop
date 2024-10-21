import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { useCartCtx } from '../hooks/useCartCtx';
import { useCode } from '../hooks/useCode';
import { useUser } from '../hooks/useUser';
import Button from '../ui/Button';
import Form from '../ui/Form';
import Select from '../ui/Select';
import {
    calculateDeliveryCost,
    haversineDistance,
} from '../utils/helperFunction';

const schema = yup.object().shape({
    address: yup.string().required('Please enter your street address'),
});

function Checkout() {
    const location = useLocation();
    const {
        totalPrice,
        discount = 0,
        codeValue = 0,
        subtotal = 0,
        promoCode = '',
    } = location.state || {}; // Safely access state
    const { setTotalPrice, setPromoCode } = useCartCtx();
    const { checkCode, isChecking, error: invalidCode } = useCode();

    const [localDiscount, setLocalDiscount] = useState(discount);
    const [localCodeValue, setLocalCodeValue] = useState(codeValue);
    const [localSubtotal, setLocalSubtotal] = useState(subtotal);
    const [isTyping, setIsTyping] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            address: '',
            deliveryCost: 0,
        },
        resolver: yupResolver(schema),
    });

    const { data: user, isLoading } = useUser();

    const [distance, setDistance] = useState(null);
    const [deliveryCost, setDeliveryCost] = useState(0);

    useEffect(() => {
        if (!user || !user.address) return;

        const formattedAddress = `${user.address.streetAddress}, ${user.address.ward}, ${user.address.district}, ${user.address.city}`;
        reset({ address: formattedAddress, deliveryCost });

        const calculateDistance = async () => {
            try {
                const distance = await haversineDistance(user.address); // Assuming this function returns coordinates
                const cost = await calculateDeliveryCost(distance);
                setDistance(distance);
                setDeliveryCost(cost);
                console.log('Distance:', distance);
            } catch (error) {
                console.error('Error calculating distance:', error);
            }
        };

        calculateDistance();
    }, [user, reset, deliveryCost]);

    const onSubmit = (data) => {
        console.log(data);
    };
    const onReset = () => {
        reset();
    };

    const handlePromoCodeChange = async (e) => {
        const code = e.target.value;
        setPromoCode(code);
        setIsTyping(true);
        setLocalCodeValue(0);
        setLocalDiscount(0);
        setTotalPrice(subtotal);
    };

    const handlePromoCodeSubmit = async (e) => {
        e.preventDefault();
        if (promoCode === '') return;
        setIsTyping(false);
        try {
            const response = await checkCode(promoCode);
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
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1 className='text-center text-capitalize'>Payment</h1>
            <div></div>
            <Form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='row justify-content-between'>
                    <div className='col-12 col-md-4 col-lg-4'>
                        <label htmlFor='address' className='form-label'>
                            Payment methods:
                        </label>
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
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
                    </div>
                </div>
                <div className='row justify-content-between'>
                    <div className='col-12 col-md-4 col-lg-4'>
                        <label htmlFor='address' className='form-label'>
                            Payment methods:
                        </label>
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <Select className='form-select'>
                            <option value='1'>Cash on delivery</option>
                            <option value='2'>Credit card</option>
                        </Select>
                    </div>
                </div>
                <div className='row justify-content-between'>
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
                                    <span className='text-warning'>
                                        Shipping cost applies for distances
                                        greater than 1 km.
                                    </span>
                                )}
                            </span>
                        )}
                    </div>
                </div>
                <div className='row justify-content-between'>
                    <div className='col-12 col-md-4 col-lg-4'>
                        Payment detail:
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <p>Total money: {subtotal}</p>
                        <p>Total delivery cost: {}</p>
                        <p>Discount: {localDiscount}</p>
                        <p>Total paid: {totalPrice}</p>
                    </div>
                </div>

                <div className='row mt-4 d-flex justify-content-between'>
                    <Button
                        $variation='secondary'
                        type='reset'
                        className='col-3 py-3 text-capitalize'
                        disabled={false}
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                    <Button
                        type='submit'
                        className='col-5 py-3 text-capitalize'
                        disabled={false}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Checkout;
