import { FaSearch } from 'react-icons/fa';

const SearchInput = () => {
    return (
        <div className="flex items-center bg-gray-900 p-2 rounded-lg">
            <input 
                type="text" 
                placeholder="Search…" 
                className="flex-1 p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
            />
            <button 
                type="submit" 
                className="ml-2 p-2 text-white rounded-full hover:bg-blue-600 transition"
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchInput;
