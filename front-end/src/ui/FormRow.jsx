function FormRow({
    name,
    children,
    type = 'text',
    inputId,
    helpText,
    register,
    disabled,
}) {
    return (
        <div className='row align-items-center'>
            <div className='col-12 col-md-4 col-lg-4'>
                <label
                    htmlFor={inputId}
                    className='col-form-label text-capitalize'
                >
                    {children}
                </label>
            </div>
            <div className='col-12 col-md-8 col-lg-8'>
                <input
                    type={type}
                    id={inputId}
                    name={name}
                    className='form-control form-control-lg focus-ring focus-ring-success py-2 px-4 fs-4'
                    placeholder={helpText}
                    disabled={disabled}
                    {...register(inputId)}
                />
            </div>
        </div>
    );
}

export default FormRow;
