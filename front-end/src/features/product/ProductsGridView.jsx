import { PAGE_SIZE } from '../../utils/constant';
import { useProducts } from './useProducts';
import ProductCard from './ProductCard';
import ProductsOperationBar from './ProductsOperationBar';
import EmptyData from '../../ui/EmptyData';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import RingLoader from 'react-spinners/RingLoader';
import Error from '../../ui/Error';

function ProductsGridView() {
    const { isLoading, error, data, count } = useProducts();
    if (isLoading)
        return (
            <Spinner>
                <RingLoader color='blue' />
            </Spinner>
        );
    if (error) return <Error>Error: {error.message}</Error>;
    if (count === 0) return <EmptyData resourceName={'products'} />;

    const pageCount = Math.ceil(count / PAGE_SIZE);

    return (
        <div>
            <ProductsOperationBar />
            <div className='row justify-content-start row-gap-5'>
                {data.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className='col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2 px-3'
                        >
                            <ProductCard item={item} />
                        </div>
                    );
                })}
            </div>
            {pageCount > 1 && (
                <div className='d-flex justify-content-center mt-5'>
                    <Pagination totalPages={pageCount} />
                </div>
            )}
        </div>
    );
}

export default ProductsGridView;
