import styled from 'styled-components';
import FilterBar from '../../ui/FilterBar';
import SortBar from '../../ui/SortBar';
import SearchBar from '../../ui/SearchBar';
import { searchProducts } from '../../services/apiProduct';
import { countDiscount, formatPrice } from '../../utils/helperFunction';

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

const SearchItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    aspect-ratio: 1;
    max-height: 50px;
    width: 100%;
    padding: 0.5rem 1.5rem;
    img {
        width: 70px;
        height: 50px;
        object-fit: contain;
    }
    &:hover {
        background-color: var(--color-blue-200);
        cursor: pointer;
    }
`;

const Title = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
            <GlassesSearchBar
                apiSearch={searchProducts}
                render={(item, index) => {
                    return (
                        <SearchItem key={item.id}>
                            <span className='col-1'>{index + 1}</span>
                            <img
                                className='col-3'
                                src={item.thumbnail}
                                alt={`${item.title}`}
                            />
                            <Title className='col-5 ps-4'>{item.title}</Title>
                            <div className='col-3 d-flex flex-column text-end'>
                                {item.discount ? (
                                    <>
                                        <span className='text-decoration-line-through'>
                                            {item.price}
                                        </span>
                                        <span className='text-danger'>
                                            {formatPrice(
                                                countDiscount(
                                                    item.price,
                                                    item.discount
                                                )
                                            )}
                                        </span>
                                    </>
                                ) : (
                                    <span>{item.price}</span>
                                )}
                            </div>
                        </SearchItem>
                    );
                }}
            />
        </Container>
    );
}

export default GlassesOperationBar;
