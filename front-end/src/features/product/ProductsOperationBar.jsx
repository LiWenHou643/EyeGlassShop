import styled from 'styled-components';
import { searchProducts } from '../../api/apiProduct';
import FilterBar from '../../ui/FilterBar';
import SearchBar from '../../ui/SearchBar';
import SortBar from '../../ui/SortBar';
import { countDiscount, formatPrice } from '../../utils/helperFunction';

const SortOptions = [
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
];

function ProductsOperationBar() {
    return (
        <Container className='row mx-0 justify-content-between'>
            <FilterBar
                className='col-12 col-md-6 col-xl-4'
                filterField='category'
                options={[
                    { label: 'All', value: 'all' },
                    { label: 'Eyeglasses', value: 'eyeglasses' },
                    { label: 'Sunglasses', value: 'sunglasses' },
                    { label: 'Eyelens', value: 'eyelens' },
                ]}
            />
            <SortBar
                className='my-4 my-md-0 col-12 col-md-5 col-xl-3'
                sortField='sort'
                options={SortOptions}
            />
            <SearchBar
                className='col-12 col-md-6 col-xl-4'
                apiSearch={searchProducts}
                render={(item, index) => {
                    return (
                        <SearchItem href={`/products/${item.id}`} key={item.id}>
                            <span className='col-1'>{index + 1}</span>
                            <img
                                className='col-3'
                                src={item.image}
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

export default ProductsOperationBar;

const Container = styled.div`
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000000;
`;

const SearchItem = styled.a`
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
