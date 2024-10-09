import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import {
    calculateDeliveryCost,
    haversineDistance,
} from '../utils/helperFunction';

const schema = yup.object().shape({
    fullname: yup.string().required('Please enter your fullname'),
    address: yup.string().required('Please enter your street address'),
    phone: yup.string().required('Please enter your phone number'),
});
function Checkout() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullname: '',
            address: '',
            phone: '',
            deliveryCost: 0,
        },
        resolver: yupResolver(schema),
    });

    const user = {
        id: 2,
        fullName: 'Le Van Hau',
        email: 'user001@gmail.com',
        phoneNumber: '0939000001',
        // address: {
        //     id: 1,
        //     streetAddress: '1 Mau Than',
        //     ward: 'Phường An Nghiệp',
        //     district: 'Quận Ninh Kiều',
        //     city: 'Thành phố Cần Thơ',
        // },
        address: {
            id: 1,
            streetAddress: '122',
            ward: 'Phường Xuân Khánh',
            district: 'Quận Ninh Kiều',
            city: 'Thành phố Cần Thơ',
        },
        roles: { id: 2, name: 'USER' },
        image: null,
    };

    const [distance, setDistance] = useState(null);
    const [deliveryCost, setDeliveryCost] = useState(0);

    useEffect(() => {
        const calculateDistance = async () => {
            try {
                // Replace with actual coordinate fetching logic
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
    }, [user.address]);

    const onSubmit = (data) => {
        console.log(data);
    };
    const onReset = () => {
        reset();
    };

    return (
        <div>
            <Form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                <FormRow
                    name='fullname'
                    inputId='fullname'
                    helpText='Must be at least 3 characters long'
                    register={register}
                    required
                    minLength={3}
                    disabled={false}
                >
                    full name
                </FormRow>
                <div className='d-flex justify-content-end'>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.fullname?.message}
                    </p>
                </div>

                <FormRow
                    name='phone'
                    inputId='phone'
                    helpText='Must be at 10 digits long'
                    register={register}
                    required
                    minLength={3}
                    disabled={false}
                >
                    phone number
                </FormRow>
                <div className='d-flex justify-content-end'>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.phone?.message}
                    </p>
                </div>

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
                <div>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {user.address !== null
                            ? distance
                                ? `${distance} km`
                                : 'Calculating...'
                            : 'Address is required for delivery'}
                    </p>
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
