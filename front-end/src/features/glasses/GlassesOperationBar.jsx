import styled from 'styled-components';
import FilterBar from '../../ui/FilterBar';
import SortBar from '../../ui/SortBar';
import SearchBar from '../../ui/SearchBar';
import { searchProducts } from '../../services/apiProduct';

const Container = styled.div`
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000000;
`;

const GlassesFilterBar = styled(FilterBar)`
    width: calc(4 / 12 * 100%);

    @media (max-width: 1400px) {
        width: calc(4 / 12 * 100%);
    }

    @media (max-width: 1200px) {
        width: calc(6 / 12 * 100%);
    }

    @media (max-width: 994px) {
        width: calc(7 / 12 * 100%);
    }

    @media (max-width: 768px) {
        width: calc(12 / 12 * 100%);
    }
`;

const GlassesSortBar = styled(SortBar)`
    width: calc(4 / 12 * 100%);
    padding: 0 20px;

    @media (max-width: 1400px) {
        width: calc(4 / 12 * 100%);
    }

    @media (max-width: 1200px) {
        width: calc(5 / 12 * 100%);
    }

    @media (max-width: 994px) {
        width: calc(5 / 12 * 100%);
    }

    @media (max-width: 768px) {
        width: calc(12 / 12 * 100%);
        padding: 0;
        margin: 20px 0;
    }
`;

const GlassesSearchBar = styled(SearchBar)`
    width: calc(4 / 12 * 100%);

    @media (max-width: 1400px) {
        width: calc(4 / 12 * 100%);
    }

    @media (max-width: 1200px) {
        width: calc(6 / 12 * 100%);
        margin: 20px auto 0;
    }

    @media (max-width: 994px) {
        width: calc(6 / 12 * 100%);
        margin: 20px auto 0;
    }

    @media (max-width: 768px) {
        width: calc(12 / 12 * 100%);
        margin-top: 0;
    }
`;

function GlassesOperationBar() {
    return (
        <Container className='d-flex justify-content-between align-items-center flex-wrap'>
            <GlassesFilterBar
                filterField='category'
                options={[
                    { label: 'All', value: 'all' },
                    { label: 'Eyeglasses', value: 'eyeglasses' },
                    { label: 'Sunglasses', value: 'sunglasses' },
                    { label: 'Eyelens', value: 'eyelens' },
                ]}
            />
            <GlassesSortBar
                sortField='sort'
                options={[
                    { label: 'Sort by name (A-Z)', value: 'title-asc' },
                    { label: 'Sort by name (Z-A)', value: 'title-desc' },
                    {
                        label: 'Sort by price (low first)',
                        value: 'price-asc',
                    },
                    {
                        label: 'Sort by price (high first)',
                        value: 'price-desc',
                    },
                    {
                        label: 'Sort by sold quantity (low first)',
                        value: 'soldQuantity-asc',
                    },
                    {
                        label: 'Sort by sold quantity (high first)',
                        value: 'soldQuantity-desc',
                    },
                ]}
            />
            <GlassesSearchBar apiSearch={searchProducts} />
        </Container>
    );
}

export default GlassesOperationBar;
