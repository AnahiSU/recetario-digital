import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ReceiptCard from "../components/ReceiptCard";
import recipes from "../mocks/recipes.json" with { type: "json" };

function SearchReceipts() {
    return (
        <div className="p-8 w-full max-w-7xl">
            <div className="mb-6, font-poppins">
                <Link 
                    to="/mis-recetas" 
                    className="inline-flex items-center gap-2 text-2xl font-medium text-slate-800 hover:text-sage-green transition-colors w-fit"
                >
                    <FiChevronLeft className="text-3xl" />
                    Buscador
                </Link>
            </div>
            <div className="mb-10 w-full max-w-2xl">
                <SearchBar />
            </div>
            <h2 className="text-2xl font-medium text-slate-800 mb-6 font-poppins">
                Recetas recientes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((receta) => (
                    <ReceiptCard 
                        key={receta.id}
                        name={receta.name}
                        time={receta.time}
                        portions={receta.portions}
                        urlPhoto={receta.urlPhoto}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default SearchReceipts;
