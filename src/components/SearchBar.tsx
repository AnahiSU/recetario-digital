import { FiSearch } from 'react-icons/fi';

function SearchBar() {
    return (
        <div className="relative w-full max-w-2xl">
            <input 
                type="text" 
                placeholder="Buscar receta..." 
                className="w-full py-3 pl-6 pr-12 text-gray-700 bg-gray-50/50 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all"
            />
            <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer hover:text-sage-green transition-colors" />
            
        </div>
    );
}

export default SearchBar;