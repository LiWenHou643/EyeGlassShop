import styled, { css } from 'styled-components';

const sizes = {
    small: css`
        font-size: 1.2rem;
        padding: 0.8rem 1.2rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    `,
    medium: css`
        font-size: 1.4rem;
        padding: 1.2rem 1.6rem;
        font-weight: 500;
    `,
    large: css`
        font-size: 1.6rem;
        padding: 1.6rem 2.4rem;
        font-weight: 500;
    `,
};

const variations = {
    primary: css`
        color: var(--color-grey-0);
        background-color: var(--color-indigo-400);
        &:hover {
            background-color: var(--color-indigo-300);
            border: 1px solid var(--color-grey-800);
        }

        &:disabled {
            color: var(--color-grey-500);
            border: 1px solid var(--color-grey-500);
            background-color: var(--color-grey-300);
        }
    `,
    secondary: css`
        color: var(--color-grey-800);
        background: var(--color-grey-200);

        &:hover {
            background-color: var(--color-grey-0);
        }
        &:disabled {
            color: var(--color-grey-500);
            border: 1px solid var(--color-grey-500);
            background-color: var(--color-grey-300);
        }
    `,
    danger: css`
        color: var(--color-red-100);
        background-color: var(--color-red-700);

        &:hover {
            background-color: var(--color-red-800);
        }
    `,
};

const Button = styled.button`
    border: 1px solid var(--color-grey-800);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);

    ${(props) => sizes[props.$size]}
    ${(props) => variations[props.$variation]}
`;

Button.defaultProps = {
    $variation: 'primary',
    $size: 'medium',
};

export default Button;
