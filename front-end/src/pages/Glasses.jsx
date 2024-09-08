import Spinner from '../ui/Spinner';
import GlassCard from '../features/glasses/GlassCard';
import { useAllGlasses } from '../features/glasses/useAllGlasses';
import RingLoader from 'react-spinners/RingLoader';
import EmptyData from '../ui/EmptyData';
import FilterBar from '../ui/FilterBar';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Container = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;
function AllGlasses() {
    const navigate = useNavigate();
    const location = useLocation();

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
    let dataFiltered = data;
    const type = new URLSearchParams(location.search).get('type');
    if (type !== 'all') {
        dataFiltered = data.filter((item) => item.category === type);
    }

    return (
        <Container className='container'>
            <FilterBar
                filterField='type'
                options={[
                    { label: 'All', value: 'all' },
                    { label: 'Eyeglasses', value: 'eyeglasses' },
                    { label: 'Sunglasses', value: 'sunglasses' },
                    { label: 'Eyelens', value: 'eyelens' },
                ]}
            />
            <div className='row justify-content-start row-gap-5'>
                {dataFiltered.map((item) => {
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
