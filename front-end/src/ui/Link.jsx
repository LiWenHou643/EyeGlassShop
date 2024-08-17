import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BaseStyledLink = styled(Link)`
    text-align: center;
    padding: 0.4rem 0.5rem;
    margin: 0 !important;
    color: var(--color-grey-700);
    margin: 0 0.5rem;
    border-radius: 0.5rem;
`;

export default BaseStyledLink;
