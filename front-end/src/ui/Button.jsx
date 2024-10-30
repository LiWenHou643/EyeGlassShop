import styled, { css } from 'styled-components';

const sizes = {
    small: css`
        font-size: 1.2rem;
        padding: 0.6rem 1.2rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    `,
    medium: css`
        font-size: 1.4rem;
        padding: 0.8rem 1.6rem;
        font-weight: 600;
    `,
    large: css`
        font-size: 1.6rem;
        padding: 1.2rem 2.2rem;
        font-weight: 600;
    `,
};

const variations = {
    primary: css`
        color: var(--color-grey-100);
        background-color: var(--color-indigo-400);

        &:hover {
            background-color: var(--color-indigo-500);
        }

        &:disabled {
            color: var(--color-grey-500);
            background-color: var(--color-grey-300);
        }
    `,
    white: css`
        color: var(--color-grey-800);
        background-color: var(--color-grey-0);

        &:hover {
            background-color: var(--color-grey-400);
            color: var(--color-const-grey-800);
        }
    `,
    secondary: css`
        color: var(--color-grey-800);
        background: var(--color-grey-200);

        &:hover {
            background-color: var(--color-grey-300);
        }
        &:disabled {
            color: var(--color-grey-500);
            background-color: var(--color-grey-300);
        }
    `,
    success: css`
        color: var(--color-grey-100);
        background-color: var(--color-green-400);

        &:hover {
            background-color: var(--color-green-500);
        }
    `,
    danger: css`
        color: var(--color-grey-100);
        background-color: var(--color-red-600);

        &:hover {
            background-color: var(--color-red-500);
        }
    `,
    toggle: css`
        font-size: 2.5rem;
        padding: 0rem 1rem;
        height: 40px;
        color: var(--color-grey-800);
        background-color: transparent;
        border: none;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: 0.3s ease;
        &:hover {
            color: var(--color-grey-100);
        }
        @media (max-width: 768px) {
            margin-left: auto;
        }
    `,
};

const Button = styled.button`
    border: none;
    border-radius: var(--border-radius-sm);

    ${(props) => sizes[props.$size]}
    ${(props) => variations[props.$variation]}
    ${(props) => props.$nobg && 'background: transparent;'}
`;

Button.defaultProps = {
    $variation: 'primary',
    $size: 'medium',
    $nobg: false,
};

export default Button;
