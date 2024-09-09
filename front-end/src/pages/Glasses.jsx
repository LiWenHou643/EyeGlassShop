import Spinner from '../ui/Spinner';
import GlassCard from '../features/glasses/GlassCard';
import { useGlasses } from '../features/glasses/useGlasses';
import RingLoader from 'react-spinners/RingLoader';
import EmptyData from '../ui/EmptyData';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import GlassesOperationBar from '../features/glasses/GlassesOperationBar';

const Container = styled.div`
    margin-top: 200px;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;

const Error = styled.div`
    text-align: center;
    margin-top: 200px;
    color: red;

    @media (max-width: 1023px) {
        margin-top: 40px;
    }
`;

function Glasses() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Filter glasses based on the query string
    const categoryValue = searchParams.get('category');
    const category =
        !categoryValue || categoryValue === 'all' ? null : categoryValue;

    // Sort glasses based on the query string
    const sortBy = searchParams.get('sort') || 'title-asc';
    const [field, direction] = sortBy.split('-');
    const sort = `${field}-${direction}`;

    // Pagination
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    // Fetch all glasses
    const { isLoading, error, data } = useGlasses({
        category,
        sort,
        page,
    });
    if (isLoading)
        return (
            <Spinner>
                <RingLoader color='blue' />
            </Spinner>
        );
    if (error) return <Error>Error: {error.message}</Error>;
    if (data.length === 0) return <EmptyData resourceName={'glasses'} />;

    return (
        <Container className='container'>
            <GlassesOperationBar />
            <div className='row justify-content-start row-gap-5'>
                {data.map((item) => {
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

export default Glasses;
