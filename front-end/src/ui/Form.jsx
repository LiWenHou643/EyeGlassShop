import styled from 'styled-components';

const StyledForm = styled.form`
    a:hover {
        color: var(--color-green-700);
    }
`;

function Form({ onSubmit, children }) {
    return (
        <StyledForm
            onSubmit={onSubmit}
            className='w-100 d-flex flex-column gap-4'
        >
            {children}
        </StyledForm>
    );
}

export default Form;
