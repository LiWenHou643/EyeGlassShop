import ReactPaginate from 'react-paginate';
import { PAGE_MAX_TO_SHOW } from '../utils/constant';
import { useSearchParams } from 'react-router-dom';

function Pagination({ totalPages }) {
    const [, setSearchParams] = useSearchParams();

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
        />
    );
}
export default Pagination;
