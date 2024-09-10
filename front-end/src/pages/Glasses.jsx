import Spinner from '../ui/Spinner';
import GlassCard from '../features/glasses/GlassCard';
import { useGlasses } from '../features/glasses/useGlasses';
import RingLoader from 'react-spinners/RingLoader';
import EmptyData from '../ui/EmptyData';
import styled from 'styled-components';
import GlassesOperationBar from '../features/glasses/GlassesOperationBar';
import Pagination from '../ui/Pagination';
import { PAGE_SIZE } from '../utils/constant';

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
    const { isLoading, error, data, count } = useGlasses();
    if (isLoading)
        return (
            <Spinner>
                <RingLoader color='blue' />
            </Spinner>
        );
    if (error) return <Error>Error: {error.message}</Error>;
    if (count === 0) return <EmptyData resourceName={'glasses'} />;

    const pageCount = Math.ceil(count / PAGE_SIZE);

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
            {pageCount > 1 && (
                <div className='d-flex justify-content-center mt-5'>
                    <Pagination totalPages={pageCount} />
                </div>
            )}
        </Container>
    );
}

export default Glasses;
