import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { PAGE_MAX_TO_SHOW } from '../utils/constant';

function Pagination({ totalPages }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePageChange = (selectedPage) => {
        const page = selectedPage.selected + 1; // ReactPaginate is zero-indexed, so add 1 for page number
        setSearchParams({ page }); // Update the 'page' parameter in the URL
    };
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={PAGE_MAX_TO_SHOW}
            previousLabel={'\u00AB'}
            nextLabel={'\u00BB'}
            breakLabel={'...'}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={currentPage - 1}
        />
    );
}
export default Pagination;
