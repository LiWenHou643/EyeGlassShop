import styled from 'styled-components';
import FilterBar from '../../ui/FilterBar';
import SortBar from '../../ui/SortBar';

const Container = styled.div`
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000000;
`;

function FilterSortBar() {
    return (
        <Container className='d-flex justify-content-between align-items-center'>
            <FilterBar
                filterField='type'
                options={[
                    { label: 'All', value: 'all' },
                    { label: 'Eyeglasses', value: 'eyeglasses' },
                    { label: 'Sunglasses', value: 'sunglasses' },
                    { label: 'Eyelens', value: 'eyelens' },
                ]}
            />
            <SortBar
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
        </Container>
    );
}

export default FilterSortBar;
