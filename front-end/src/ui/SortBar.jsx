import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBar({ sortField, options, className }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get(sortField) || options.at(0).value;

    function handleChange(e) {
        searchParams.set(sortField, e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <div className={`${className} d-flex align-items-center`}>
            <Select options={options} value={sortBy} onChange={handleChange} />
        </div>
    );
}

export default SortBar;
