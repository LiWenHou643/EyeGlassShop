import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUser } from '../hooks/useUser';
import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import {
    calculateDeliveryCost,
    haversineDistance,
} from '../utils/helperFunction';

const schema = yup.object().shape({
    address: yup.string().required('Please enter your street address'),
});

function Checkout() {
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

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <Form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                <input type='hidden' name={user.id} value={user.id} />

                <FormRow
                    name='address'
                    inputId='address'
                    helpText='Address is required for delivery'
                    register={register}
                    required
                    disabled={false}
                >
                    address
                </FormRow>
                <div className='d-flex justify-content-end'>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.address?.message}
                    </p>
                </div>

                <div className='row align-items-center'>
                    <div className='col-12 col-md-4 col-lg-4'>
                        <label
                            htmlFor='deliveryCost'
                            className='col-form-label text-capitalize'
                        >
                            delivery cost
                        </label>
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <input
                            type='text'
                            id='deliveryCost'
                            name='deliveryCost'
                            className='form-control form-control-lg focus-ring focus-ring-success py-2 px-4 fs-4'
                            placeholder='Delivery cost base on your distance from our store to your address'
                            disabled
                            value={deliveryCost}
                            {...register('deliveryCost')}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='px-2 col-12 col-md-8 col-lg-8 h5'>
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
