import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiClock, FiUser, FiEdit, FiTrash2 } from "react-icons/fi";
import recipes from "../mocks/recipes.json" with { type: "json" };

function RecipeDetail() {
    const { id } = useParams();
    const receta = recipes.find(r => r.id.toString() === id) || {
        name: "Receta no encontrada",
        time: "--",
        portions: "--",
        urlPhoto: "",
        category: "General",
        ingredients: [],
        preparation: [],
        notes: []
    };

    return (
        <div className="p-8 w-full max-w-5xl mx-auto font-poppins text-slate-800">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <Link to="/buscar" className="hover:text-sage-green transition-colors">
                        <FiChevronLeft className="text-3xl" />
                    </Link>
                    <h1 className="text-3xl font-semibold">{receta.name}</h1>
                    <span className="bg-sage-green/15 border border-sage-green/60 text-sm px-3 py-1 rounded-md text-gray-600">
                        Categoria: {receta.category}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 border-2 border-sage-green/60 rounded hover:bg-sage-green/15 transition-colors">
                        <FiEdit className="text-xl text-gray-700" />
                    </button>
                    <button className="p-2 border-2 border-sage-green/60 rounded hover:bg-sage-green/15 transition-colors">
                        <FiTrash2 className="text-xl text-gray-700" />
                    </button>
                </div>
            </div>
            <div className="flex gap-8 text-gray-600 mb-6 font-inter pl-10">
                <div className="flex items-center gap-2">
                    <span>Tiempo: {receta.time}</span>
                    <FiClock className="text-xl" />
                </div>
                <div className="flex items-center gap-2">
                    <span>Porciones: {receta.portions}</span>
                    <FiUser className="text-xl" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 h-64 overflow-hidden rounded-sm shadow-sm border border-gray-200">
                    <img src={receta.urlPhoto} alt={receta.name} className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 bg-sage-green/10 border-2 border-sage-green/40 p-5 rounded-sm">
                    <h2 className="text-xl font-medium mb-4">Ingredientes:</h2>
                    <div className="grid grid-cols-2 gap-4 gap-x-12">
                        {receta.ingredients.map((ingrediente, index) => (
                            <div key={index} className="flex items-end gap-3">
                                <div className="w-2 h-2 mb-1 rounded-full border-2 border-gray-700 shrink-0"></div>
                                <div className="border-b border-gray-400 w-full pb-1 text-sm text-gray-700 leading-tight">
                                    <span className="font-semibold">{ingrediente.quantity}</span> de {ingrediente.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 bg-sage-green/10 border-2 border-sage-green/40 p-5 rounded-sm">
                    <h2 className="text-xl font-medium mb-4">Preparacion:</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {receta.preparation.map((paso, index) => (
                            <div key={index} className="flex items-end gap-3">
                                <div className="w-2 h-2 mb-1 rounded-full border-2 border-gray-700 shrink-0"></div>
                                <div className="border-b border-gray-400 w-full pb-1 text-sm text-gray-700">
                                    {paso}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notas */}
                <div className="col-span-1 bg-sage-green/10 border-2 border-sage-green/40 p-5 rounded-sm">
                    <h2 className="text-xl font-medium mb-4">Notas:</h2>
                    <div className="flex flex-col gap-4">
                        {receta.notes.map((nota, index) => (
                            <div key={index} className="flex items-end gap-3">
                                <div className="w-2 h-2 mb-1 rounded-full border-2 border-gray-700 shrink-0"></div>
                                <div className="border-b border-gray-400 w-full pb-1 text-sm text-gray-700 leading-tight">
                                    {nota}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default RecipeDetail;