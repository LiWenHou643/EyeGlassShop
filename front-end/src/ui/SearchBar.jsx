import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';

const SearchValueDropdown = styled.div`
    position: absolute;
    max-height: 300px;
    top: 100%;
    z-index: 3;
    background-color: var(--color-const-grey-100);
    width: 100%;
    overflow-y: scroll;
    color: var(--color-const-grey-800);
`;

const Input = styled.input`
    font-size: 1.6rem;
    background-color: transparent;
    color: var(--color-grey-800);
    border: 1px solid var(--color-grey-800);
    &::placeholder {
        color: var(--color-grey-800);
    }

    &:focus {
        outline: none;
        background-color: var(--color-const-grey-100);
        box-shadow: none;
        border-color: var(--color-grey-800);
        &::placeholder {
            color: var(--color-const-grey-800);
        }
    }
`;

function SearchBar({ apiSearch, render }) {
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
        <form className='d-flex position-relative' role='search'>
            <Input
                className='form-control py-3 px-4'
                type='search'
                placeholder='Search product by title...'
                aria-label='Search'
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setIsClosed(true)}
                onFocus={() => setIsClosed(false)}
            />
            <SearchValueDropdown>
                {!isClosed && data.length > 0 && data.map(render)}
            </SearchValueDropdown>
        </form>
    );
}

export default SearchBar;
