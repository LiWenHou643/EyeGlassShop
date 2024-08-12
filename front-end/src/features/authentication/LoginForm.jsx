import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { Link } from 'react-router-dom';
import Form from '../../ui/Form';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            pwd: '',
        },
    });

    function onSubmit(data, event) {
        event.preventDefault();
        console.log(data);
        // Handle form submission
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                htmlFor='email'
                inputId='email'
                type='email'
                helpText='Must be a valid email'
                register={register}
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
            >
                password
            </FormRow>
            <div className='d-flex justify-content-end'>
                <p className='text-danger px-2 col-12 col-md-8 col-lg-8'>
                    {errors?.pwd?.message}
                </p>
            </div>
            <div className='row mt-4 d-flex justify-content-between'>
                <Link
                    to='/signin'
                    className='col-6 col-sm-5 col-lg-4 py-3 text-capitalize'
                >
                    Create account
                </Link>
                <Button
                    type='submit'
                    className='col-6 col-sm-5 col-lg-4 py-3 btn btn-success text-capitalize'
                >
                    Log in
                </Button>
            </div>
        </Form>
    );
}
