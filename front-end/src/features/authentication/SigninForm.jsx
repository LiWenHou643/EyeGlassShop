import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useCreateUser } from './useCreateUser';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            pwd: '',
            pwdc: '',
        },
    });

    const { createUser, isCreatingUser } = useCreateUser();

    const onSubmit = (data) => {
        const formattedData = {
            fullName: data.fullname,
            email: data.email,
            password: data.pwd,
        };
        console.log('formattedData', formattedData);
        createUser({ ...formattedData });
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
                disabledd={isCreatingUser}
            >
                full name
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8'>
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
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8'>
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
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8'>
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
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8'>
                    {errors?.pwdc?.message}
                </p>
            </div>
            <div className='row mt-4 d-flex justify-content-between'>
                <Link
                    className='col-6 col-sm-5 col-lg-4 py-3 text-capitalize'
                    to='/login'
                    disabled={isCreatingUser}
                >
                    Back to login
                </Link>
                <Button
                    type='submit'
                    className='col-6 col-sm-5 col-lg-4 py-3 btn btn-success text-capitalize'
                    disabled={isCreatingUser}
                >
                    Create ccount
                </Button>
            </div>
        </Form>
    );
}
