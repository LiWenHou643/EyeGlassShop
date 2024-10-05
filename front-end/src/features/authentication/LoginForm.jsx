import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '../../features/authentication/useLogin';
import { SyncLoader } from 'react-spinners';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import styled from 'styled-components';

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

const StyledLink = styled(Link)`
    color: var(--color-grey-600);
    font-style: italic;
`;

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
            persistent: false,
        },
        resolver: yupResolver(schema),
    });

    const { persist, setPersist } = useAuth();

    const togglePersist = () => {
        setPersist((persist) => !persist);
    };

    const { login, isLoggingin } = useLogin();

    function onSubmit(data) {
        login(
            { username: data.email, password: data.pwd, persistent: persist },
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
                name='email'
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
                name='pwd'
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

            <div className='form-check d-flex align-items-center justify-content-end'>
                <input
                    className='form-check-input'
                    type='checkbox'
                    id='persist'
                    checked={persist}
                    onChange={togglePersist}
                    disabled={isLoggingin}
                />
                <label className='form-check-label ms-2 mt-2' htmlFor='persist'>
                    Remember me
                </label>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <div className='col-7 d-md-flex justify-content-md-start align-items-md-center'>
                    <p>Has no account? &nbsp;</p>
                    <StyledLink className='py-3 rounded-2' to='/signin'>
                        Register now
                    </StyledLink>
                </div>
                <div className='col-5 d-flex justify-content-end align-items-center'>
                    <StyledLink
                        className='py-3 rounded-2'
                        to='/forgot-password'
                    >
                        Forgot password
                    </StyledLink>
                </div>
            </div>

            <div className='row mt-4 d-flex justify-content-between'>
                <Button
                    $variation='secondary'
                    type='reset'
                    className='col-3 py-3 text-capitalize'
                    disabled={isLoggingin}
                    onClick={reset}
                >
                    Reset
                </Button>
                <Button
                    type='submit'
                    className='col-3 py-3 text-capitalize'
                    disabled={isLoggingin}
                >
                    {isLoggingin ? <SyncLoader color='#ffffff' /> : 'Log in'}
                </Button>
            </div>
        </Form>
    );
}
