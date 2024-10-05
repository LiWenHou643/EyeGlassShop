import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfile } from './useUpdateProfile';
import { useUser } from '../../hooks/useUser';
import { RingLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Select from '../../ui/Select';
import axios from 'axios';
import styled from 'styled-components';

const phoneRegExp =
    /^(?:\+84|0)(3[2-9]|7[0-9]|8[0-9]|9[0-9]|1[0-9]|4[0-9]|5[0-9]|6[0-9]|8[1-9]|9[8-9])\d{7}$/;

const schema = yup.object({
    fullname: yup
        .string()
        .required('Full name is required')
        .min(3, 'Full name must be at least 3 characters long'),
    city: yup.string().required('City is required'),
    district: yup.string().required('District is required'),
    ward: yup.string().required('Ward is required'),
    streetAddress: yup.string().required('Street Address is required'),
    phone: yup
        .string()
        .required('Phone is required')
        .matches(phoneRegExp, 'Phone number is not valid.'),
});

function ProfileForm() {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Fetch cities, districts, and wards from the API
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(
                    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
                );
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    // Fetch user data
    const { isLoading, isFetching, data, error } = useUser();

    // React Hook Form
    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullname: '',
            city: '',
            district: '',
            ward: '',
            streetAddress: '',
            phone: '',
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            // Set individual field values using setValue
            setValue('fullname', data?.fullName || '');
            setValue('city', data?.address?.city || '');
            setValue('phone', data?.phoneNumber || '');
            setValue('district', data?.address?.district || '');
            setValue('ward', data?.address?.ward || '');
            setValue('streetAddress', data?.address?.streetAddress || '');
        }
    }, [isLoading, isFetching, data, setValue]);

    const { isUpdatingProfile, updateProfile } = useUpdateProfile(reset);

    const watchedCity = watch('city');
    const watchedDistrict = watch('district');
    const watchedWard = watch('ward');
    const watchedStreetAddress = watch('streetAddress');

    useEffect(() => {
        if (watchedCity) {
            const city = cities.find((c) => c.Name === watchedCity);
            if (city) {
                setDistricts(city.Districts);
            }
        } else {
            setDistricts([]); // Clear districts if no city is selected
            setWards([]); // Clear wards if no city is selected
        }
    }, [cities, watchedCity]);

    useEffect(() => {
        if (watchedDistrict) {
            const district = districts.find((d) => d.Name === watchedDistrict);
            if (district) {
                setWards(district.Wards);
            }
        } else {
            setWards([]); // Clear wards if no district is selected
        }
    }, [districts, watchedDistrict]);

    const onSubmit = async (data) => {
        const formattedData = {
            fullName: data.fullname,
            phoneNumber: data.phone,
            address: {
                city: data.city,
                district: data.district,
                ward: data.ward,
                streetAddress: data.streetAddress,
            },
        };
        const updatedUser = await updateProfile({ ...formattedData });

        // Log the updated user to inspect its structure
        console.log('Updated user:', updatedUser);

        // Reset the form with the updated user data
        reset({
            fullname: updatedUser.fullname,
            phone: updatedUser.phone,
            city: updatedUser.address.city,
            district: updatedUser.address?.district,
            ward: updatedUser.address?.ward,
            streetAddress: updatedUser.address?.streetAddress,
        });
    };

    const onReset = () => {
        reset(); // Reset the form
    };

    if (isLoading || isFetching)
        return (
            <Loading>
                <RingLoader color='blue' />
            </Loading>
        );
    if (error) return <Error>Error: {error.message}</Error>;

    return (
        <Form
            className='w-100 d-flex flex-column gap-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormRow
                name='fullname'
                inputId='fullname'
                helpText='Must be at least 3 characters long'
                register={register}
                required
                minLength={3}
                disabled={isUpdatingProfile}
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
                disabled={isUpdatingProfile}
            >
                phone number
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                    {errors?.phone?.message}
                </p>
            </div>

            {/* Select city */}
            <div className='row justify-content-between'>
                <div className='col-12 col-md-4 col-lg-4'>
                    <label
                        htmlFor='city'
                        className='col-form-label text-capitalize'
                    >
                        City
                    </label>
                </div>
                <div className='col-12 col-md-8 col-lg-8'>
                    <Controller
                        name='city'
                        control={control}
                        defaultValue='' // Set a default value if needed
                        render={({ field }) => (
                            <StyledSelect
                                {...field}
                                id='city'
                                onChange={(e) => {
                                    field.onChange(e); // Update the value in React Hook Form
                                }}
                                disabled={isUpdatingProfile} // Disable if there are no cities
                            >
                                <option value=''>Select City</option>
                                {cities.map((city) => (
                                    <option key={city.Id} value={city.Name}>
                                        {city.Name}
                                    </option>
                                ))}
                            </StyledSelect>
                        )}
                    />
                </div>
            </div>
            {/* City error */}
            <div>
                <div className='d-flex justify-content-end'>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.city?.message}
                    </p>
                </div>
            </div>

            {/* Select district */}
            <div className='row justify-content-between'>
                <div className='col-12 col-md-4 col-lg-4'>
                    <label
                        htmlFor='district'
                        className='col-form-label text-capitalize'
                    >
                        district
                    </label>
                </div>
                <div className='col-12 col-md-8 col-lg-8'>
                    <Controller
                        name='district'
                        control={control}
                        defaultValue='' // Set a default value if needed
                        render={({ field }) => (
                            <StyledSelect
                                {...field}
                                id='district'
                                onChange={(e) => {
                                    field.onChange(e); // Update the value in React Hook Form
                                }}
                                disabled={
                                    districts.length === 0 || isUpdatingProfile
                                } // Disable if there are no wards
                            >
                                <option value=''>Select district</option>
                                {districts.map((district) => (
                                    <option
                                        key={district.Id}
                                        value={district.Name}
                                    >
                                        {district.Name}
                                    </option>
                                ))}
                            </StyledSelect>
                        )}
                    />
                </div>
            </div>
            {/* District error */}
            <div>
                <div className='d-flex justify-content-end'>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.district?.message}
                    </p>
                </div>
            </div>

            {/* Select ward */}
            <div className='row justify-content-between'>
                <div className='col-12 col-md-4 col-lg-4'>
                    <label
                        htmlFor='ward'
                        className='col-form-label text-capitalize'
                    >
                        ward
                    </label>
                </div>
                <div className='col-12 col-md-8 col-lg-8'>
                    <Controller
                        name='ward'
                        control={control}
                        defaultValue='' // Set a default value if needed
                        render={({ field }) => (
                            <StyledSelect
                                {...field}
                                id='ward'
                                onChange={(e) => {
                                    field.onChange(e); // Update the value in React Hook Form
                                }}
                                disabled={
                                    wards.length === 0 || isUpdatingProfile
                                } // Disable if there are no wards
                            >
                                <option value=''>Select ward</option>
                                {wards.map((ward) => (
                                    <option key={ward.Id} value={ward.Name}>
                                        {ward.Name}
                                    </option>
                                ))}
                            </StyledSelect>
                        )}
                    />
                </div>
            </div>
            {/* Ward error */}
            <div>
                <div className='d-flex justify-content-end'>
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.ward?.message}
                    </p>
                </div>
            </div>

            <FormRow
                htmlFor='streetAddress'
                inputId='streetAddress'
                helpText='Must be at least 3 characters long'
                register={register}
                required
                minLength={3}
                disabled={isUpdatingProfile}
            >
                street address
            </FormRow>

            <div className='d-flex justify-content-end'>
                {errors?.streetAddress?.message && (
                    <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                        {errors?.streetAddress?.message}
                    </p>
                )}
                {!errors?.streetAddress?.message && (
                    <p
                        className='px-3 col-12 col-md-8 col-lg-8 h5'
                        style={{ color: 'var(--color-grey-800)' }}
                    >
                        {!errors?.streetAddress &&
                        watchedStreetAddress &&
                        watchedWard &&
                        watchedDistrict &&
                        watchedCity
                            ? watchedStreetAddress +
                              ', ' +
                              watchedWard +
                              ', ' +
                              watchedDistrict +
                              ', ' +
                              watchedCity
                            : ''}
                    </p>
                )}
            </div>

            <div className='row mt-4 d-flex justify-content-between'>
                <Button
                    $variation='secondary'
                    type='reset'
                    className='col-3 py-3 text-capitalize'
                    disabled={isUpdatingProfile}
                    onClick={onReset}
                >
                    Reset
                </Button>
                <Button
                    type='submit'
                    className='col-5 py-3 text-capitalize'
                    disabled={isUpdatingProfile}
                >
                    {isUpdatingProfile ? 'Updating' : 'Update profile'}
                </Button>
            </div>
        </Form>
    );
}

const StyledSelect = styled(Select)`
    background-color: #ffffffff;
    box-shadow: none;
    color: #333333;
`;

export default ProfileForm;
