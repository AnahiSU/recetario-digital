import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ReceiptCard from "../components/ReceiptCard";

const recetasMock = [
    {
        id: 1,
        name: "Pie de limón",
        time: "15-20 min",
        portions: "3 personas",
        urlPhoto: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Ensalada César",
        time: "10 min",
        portions: "2 personas",
        urlPhoto: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Pasta al Pesto",
        time: "25 min",
        portions: "4 personas",
        urlPhoto: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Tacos al Pastor",
        time: "45 min",
        portions: "5 personas",
        urlPhoto: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=60"
    }
];

function SearchReceipts() {
    return (
        <div className="p-8 w-full max-w-7xl">
            <div className="mb-6">
                <Link 
                    to="/mis-recetas" 
                    className="inline-flex items-center gap-2 text-2xl font-bold text-slate-800 hover:text-sage-green transition-colors w-fit"
                >
                    <FiChevronLeft className="text-3xl" />
                    Buscador
                </Link>
            </div>
            <div className="mb-10 w-full max-w-2xl">
                <SearchBar />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">
                Recetas recientes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recetasMock.map((receta) => (
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