import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useCreateUser } from './useCreateUser';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    fullname: yup.string().required('Full name is required'),
    email: yup
        .string()
        .email('Email is not valid')
        .required('Email is required'),
    pwd: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    pwdc: yup.string().oneOf([yup.ref('pwd'), null], 'Passwords must match'),
});

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            pwd: '',
            pwdc: '',
        },
        resolver: yupResolver(schema),
    });

    const { createUser, isCreatingUser } = useCreateUser(reset);

    const onSubmit = async (data) => {
        const formattedData = {
            fullName: data.fullname,
            email: data.email,
            password: data.pwd,
        };
        try {
            const createdUser = await createUser(
                { ...formattedData },
                {
                    onSuccess: () => {
                        reset();
                    },
                }
            );

            console.log(createdUser);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const onReset = () => {
        reset();
    };

    return (
        <Form
            className='w-100 d-flex flex-column gap-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormRow
                htmlFor='fullname'
                inputId='fullname'
                helpText='Must be at least 3 characters long'
                register={register}
                required
                minLength={3}
                disabled={isCreatingUser}
            >
                full name
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                    {errors?.fullname?.message}
                </p>
            </div>

            <FormRow
                htmlFor='email'
                inputId='email'
                type='email'
                helpText='Must be a valid email'
                register={register}
                required
                disabled={isCreatingUser}
            >
                email
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                    {errors?.email?.message}
                </p>
            </div>

            <FormRow
                htmlFor='pwd'
                inputId='pwd'
                type='password'
                helpText='Must be at 8-20 characters long'
                register={register}
                required
                minLength={8}
                disabled={isCreatingUser}
            >
                password
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                    {errors?.pwd?.message}
                </p>
            </div>

            <FormRow
                htmlFor='pwdc'
                inputId='pwdc'
                type='password'
                helpText='Retype password above'
                register={register}
                required
                minLength={8}
                disabled={isCreatingUser}
            >
                password confirm
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                    {errors?.pwdc?.message}
                </p>
            </div>

            <div className='d-flex justify-content-start'>
                <p>
                    Already have an account?{' '}
                    <Link
                        className='col-6 col-sm-5 col-lg-4 py-3 rounded-2 link-primary'
                        to='/login'
                        disabled={isCreatingUser}
                    >
                        Login now
                    </Link>
                </p>
            </div>
            <div className='row mt-4 d-flex justify-content-between'>
                <Button
                    type='reset'
                    className='col-3 py-3 btn btn-secondary text-capitalize'
                    disabled={isCreatingUser}
                    onClick={onReset}
                >
                    Reset
                </Button>
                <Button
                    type='submit'
                    className='col-5 py-3 btn btn-success text-capitalize'
                    disabled={isCreatingUser}
                >
                    Create ccount
                </Button>
            </div>
        </Form>
    );
}
