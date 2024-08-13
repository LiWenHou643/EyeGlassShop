function FormRow({
    htmlFor,
    children,
    type = 'text',
    inputId,
    helpText,
    register,
}) {
    return (
        <div className='row align-items-center'>
            <div className='col-12 col-md-4 col-lg-4'>
                <label
                    htmlFor={htmlFor}
                    className='col-form-label text-capitalize'
                >
                    {children}
                </label>
            </div>
            <div className='col-12 col-md-8 col-lg-8'>
                <input
                    type={type}
                    id={inputId}
                    className='form-control form-control-lg focus-ring focus-ring-success p-3'
                    placeholder={helpText}
                    {...register(inputId)}
                />
            </div>
        </div>
    );
}

export default FormRow;
