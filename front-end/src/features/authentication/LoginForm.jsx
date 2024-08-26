import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { Link } from 'react-router-dom';
import Form from '../../ui/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../../features/authentication/useLogin';
import { SyncLoader } from 'react-spinners';

const schema = yup.object({
    email: yup
        .string()
        .email('Email is not valid')
        .required('Email is required'),
    pwd: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: '',
            pwd: '',
        },
        resolver: yupResolver(schema),
    });

    const { login, isLoggingin } = useLogin();

    function onSubmit(data) {
        login(
            { username: data.email, password: data.pwd },
            {
                onSettled: () => {
                    reset();
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                htmlFor='email'
                inputId='email'
                type='email'
                helpText='Must be a valid email'
                register={register}
                disabled={isLoggingin}
                required
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
                disabled={isLoggingin}
            >
                password
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8 h5'>
                    {errors?.pwd?.message}
                </p>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <div className='col-7 d-md-flex justify-content-md-start align-items-md-center'>
                    <p>Has no account? &nbsp;</p>
                    <Link className='py-3 rounded-2 link-primary' to='/signin'>
                        Register now
                    </Link>
                </div>
                <div className='col-5 d-flex justify-content-end align-items-center'>
                    <Link
                        className='py-3 rounded-2 link-primary'
                        to='/forgot-password'
                    >
                        Forgot password
                    </Link>
                </div>
            </div>

            <div className='row mt-4 d-flex justify-content-between'>
                <Button
                    type='reset'
                    className='col-3 py-3 btn btn-secondary text-capitalize'
                    disabled={isLoggingin}
                    onClick={reset}
                >
                    Reset
                </Button>
                <Button
                    type='submit'
                    className='col-3 py-3 btn btn-success text-capitalize'
                    disabled={isLoggingin}
                >
                    {isLoggingin ? <SyncLoader color='#ffffff' /> : 'Log in'}
                </Button>
            </div>
        </Form>
    );
}
