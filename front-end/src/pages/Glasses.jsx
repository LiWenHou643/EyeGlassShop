import Spinner from '../ui/Spinner';
import GlassCard from '../features/glasses/GlassCard';
import { useAllGlasses } from '../features/glasses/useAllGlasses';
import RingLoader from 'react-spinners/RingLoader';
import EmptyData from '../ui/EmptyData';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FilterSortBar from '../features/glasses/FilterSortBar';

const Container = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;

function AllGlasses() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Redirect to /glasses?type=all if there is no query string
    useEffect(() => {
        if (!location.search) {
            navigate('/glasses?type=all', { replace: true });
        }
    }, [location.search, navigate]);

    // Fetch all glasses
    const { isLoading, error, data } = useAllGlasses();
    if (isLoading)
        return (
            <Spinner>
                <RingLoader color='blue' />
            </Spinner>
        );
    if (error) return <div>Error: {error.message}</div>;
    if (data.length === 0) return <EmptyData resourceName={'glasses'} />;

    // Filter glasses based on the query string
    let filterData = data;
    const type = searchParams.get('type');
    if (type !== 'all') {
        filterData = data.filter((item) => item.category === type);
    }

    // Sort glasses based on the query string
    const sortBy = searchParams.get('sort') || 'title-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;

    const sortedData = filterData.sort((a, b) => {
        if (typeof a[field] === 'string' && typeof b[field] === 'string') {
            // For string fields
            return a[field].localeCompare(b[field]) * modifier;
        }
        // For numeric fields
        return (a[field] - b[field]) * modifier;
    });

    return (
        <Container className='container'>
            <FilterSortBar />
            <div className='row justify-content-start row-gap-5'>
                {sortedData.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className=' col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2 px-3'
                        >
                            <GlassCard item={item} />
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default AllGlasses;
