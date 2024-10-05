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
            <Select value={sortBy} onChange={handleChange}>
                {options.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </div>
    );
}

export default SortBar;
