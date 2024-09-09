import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { countDiscount, formatPrice } from '../utils/helperFunction';

const SearchValueDropdown = styled.div`
    position: absolute;
    max-height: 300px;
    top: 100%;
    z-index: 3;
    background-color: #f8f9fa;
    width: 100%;
    overflow-y: scroll;
`;

const SearchValueItem = styled.div`
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
        background-color: #d0cbff;
        cursor: pointer;
    }
`;

const Title = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

function SearchBar({ apiSearch, className }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isClosed, setIsClosed] = useState(true);
    const [data, setData] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchData = async () => {
            if (debouncedSearchTerm) {
                try {
                    // Call the searchProducts function to fetch data
                    const results = await apiSearch(debouncedSearchTerm);
                    setData(results.data); // Update state with the results
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setData([]); // Clear results if search term is empty
            }
        };

        fetchData();
    }, [debouncedSearchTerm, apiSearch]);

    return (
        <form className={`${className} d-flex position-relative`} role='search'>
            <input
                className='form-control py-3 px-4 bg-transparent border border-1 border-black fs-4'
                type='search'
                placeholder='Search product by title...'
                aria-label='Search'
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setIsClosed(true)}
                onFocus={() => setIsClosed(false)}
            />
            <SearchValueDropdown>
                {!isClosed &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <SearchValueItem key={item.id}>
                                <span className='col-1'>{index + 1}</span>
                                <img
                                    className='col-3'
                                    src={item.thumbnail}
                                    alt={`${item.title}`}
                                />
                                <Title className='col-5 ps-4'>
                                    {item.title}
                                </Title>
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
                            </SearchValueItem>
                        );
                    })}
            </SearchValueDropdown>
        </form>
    );
}

export default SearchBar;
