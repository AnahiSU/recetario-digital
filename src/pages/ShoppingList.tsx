import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiTrash2, FiSearch, FiX, FiCheck } from "react-icons/fi";
import ConfirmDialog from "../components/ConfirmDialog";
import recipes from "../mocks/recipes.json" with { type: "json" };

function ShoppingList() {
    const [items, setItems] = useState([
        { id: "1", name: "Leche", quantity: "1 litro", checked: true },
        { id: "2", name: "Pollo", quantity: "4 kilos", checked: true },
        { id: "3", name: "Queso", quantity: "1 kilo", checked: false },
        { id: "4", name: "Galletas de vainilla", quantity: "1 paquete", checked: true }
    ]);
    
    const [activeModal, setActiveModal] = useState<"none" | "recipe" | "menu" | "product">("none");
    const [showConfirmCancel, setShowConfirmCancel] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const [selectedDays, setSelectedDays] = useState<string[]>(["Lunes", "Martes", "Jueves", "Viernes", "Domingo"]);
    const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const [newProductName, setNewProductName] = useState("");
    const [newProductQty, setNewProductQty] = useState("");
    const [newProductUnit, setNewProductUnit] = useState("");
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    
    const toggleItemCheck = (id: string) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };
    const requestDelete = (id: string) => {
        setItemToDelete(id);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            setItems(items.filter(item => item.id !== itemToDelete));
        }
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setItemToDelete(null);
    };

    const handleAddProduct = () => {
        if (!newProductName.trim()) return;
        
        const newItem = {
            id: Date.now().toString(),
            name: newProductName,
            quantity: `${newProductQty} ${newProductUnit}`.trim() || "Al gusto",
            checked: false
        };
        
        setItems([...items, newItem]);
        setNewProductName("");
        setNewProductQty("");
        setNewProductUnit("");
        setActiveModal("none");
    };

    const handleAddRecipe = () => {
        if (selectedRecipeId === null) return;
        
        const recipe = recipes.find(r => r.id === selectedRecipeId);
        if (recipe) {
            const newIngredients = recipe.ingredients.map((ing, index) => ({
                id: `recipe-${recipe.id}-${Date.now()}-${index}`,
                name: ing.name,
                quantity: ing.quantity,
                checked: false
            }));
            
            setItems([...items, ...newIngredients]);
        }
        
        setSelectedRecipeId(null);
        setActiveModal("none");
    };

    const toggleDaySelection = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const toggleAllDays = () => {
        if (selectedDays.length === daysOfWeek.length) {
            setSelectedDays([]);
        } else {
            setSelectedDays([...daysOfWeek]);
        }
    };

    const handleCancelRequest = () => {
        setShowConfirmCancel(true);
    };

    const confirmCancel = () => {
        setShowConfirmCancel(false);
        setActiveModal("none");
        setNewProductName("");
        setNewProductQty("");
        setNewProductUnit("");
        setSelectedRecipeId(null);
    };

    const abortCancel = () => {
        setShowConfirmCancel(false);
    };

    return (
        <div className="p-8 mx-auto w-full max-w-5xl font-poppins text-slate-800">
            <div className="mb-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-800 hover:text-sage-green transition-colors w-fit"
                >
                    <FiChevronLeft className="text-3xl" />
                    Lista de compras
                </Link>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
                <button 
                    onClick={() => setActiveModal("recipe")}
                    className="px-5 py-2 border-2 border-slate-700 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                >
                    + Agregar receta
                </button>
                <button 
                    onClick={() => setActiveModal("menu")}
                    className="px-5 py-2 border-2 border-slate-700 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                >
                    + Agregar menu semanal
                </button>
                <button 
                    onClick={() => setActiveModal("product")}
                    className="px-5 py-2 border-2 border-slate-700 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                >
                    + Agregar producto
                </button>
            </div>

            <div className="w-full border-t-2 border-slate-800">
                <div className="flex px-4 py-3 border-b-2 border-slate-800 font-medium">
                    <div className="flex-1 ml-16">Producto</div>
                    <div className="w-48 text-left">Cantidad</div>
                </div>

                <div className="flex flex-col">
                    {items.map((item) => (
                        <div key={item.id} className={`flex items-center px-4 py-4 border-b border-gray-200 transition-colors ${item.checked ? 'opacity-60 bg-gray-50' : 'hover:bg-slate-50'}`}>
                            <div className="flex items-center gap-4 flex-1">
                                <button 
                                    onClick={() => requestDelete(item.id)} // Cambiado a requestDelete
                                    className="p-2 border-2 border-slate-700 rounded-md hover:bg-red-50 transition-colors"
                                >
                                    <FiTrash2 className="text-xl text-slate-700" />
                                </button>
                                
                                <button 
                                    onClick={() => toggleItemCheck(item.id)}
                                    className={`w-8 h-8 flex items-center justify-center border-2 border-slate-700 rounded-md transition-colors bg-white`}
                                >
                                    {item.checked && <FiCheck className="text-2xl text-sage-green" />}
                                </button>
                                
                                <span className={`text-lg ml-2 ${item.checked ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                    {item.name}
                                </span>
                            </div>
                            <div className="w-48 text-left text-slate-500 text-sm">
                                {item.quantity}
                            </div>
                        </div>
                    ))}
                    
                    {items.length === 0 && (
                        <div className="text-center py-10 text-slate-500">
                            La lista está vacía. ¡Agrega productos o recetas!
                        </div>
                    )}
                </div>
            </div>
            {activeModal === "product" && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                    <div className="bg-[#fcfaf8] w-full max-w-md rounded-2xl p-6 shadow-xl relative border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-medium text-slate-700">Agregar producto</h2>
                            <button onClick={handleCancelRequest} className="text-slate-500 hover:text-slate-800">
                                <FiX className="text-3xl" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-5 mb-8">
                            <div>
                                <label className="block text-slate-800 font-medium mb-2">Nombre del producto</label>
                                <input 
                                    type="text" 
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                    placeholder="Ej. Leche" 
                                    className="w-full border-2 border-slate-700 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-sage-green"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-800 font-medium mb-2">Cantidad</label>
                                <div className="flex gap-4">
                                    <input 
                                        type="text"
                                        value={newProductQty}
                                        onChange={(e) => setNewProductQty(e.target.value)}
                                        placeholder="Ej. 2" 
                                        className="w-2/3 border-2 border-slate-700 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-sage-green"
                                    />
                                    <input 
                                        type="text" 
                                        value={newProductUnit}
                                        onChange={(e) => setNewProductUnit(e.target.value)}
                                        placeholder="Kilos" 
                                        className="w-1/3 border-2 border-slate-700 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-sage-green"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-4">
                            <button 
                                onClick={handleCancelRequest}
                                className="px-8 py-2 border-2 border-slate-700 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleAddProduct}
                                className="px-8 py-2 bg-gray-300 border-2 border-slate-700 rounded-xl text-slate-800 font-medium hover:bg-gray-400 transition-colors disabled:opacity-50"
                                disabled={!newProductName.trim()}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === "menu" && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                    <div className="bg-[#fcfaf8] w-full max-w-sm rounded-3xl p-6 shadow-xl relative border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-medium text-slate-700">Agregar menu semanal</h2>
                            <button onClick={handleCancelRequest} className="text-slate-500 hover:text-slate-800">
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                        
                        <p className="text-center text-slate-500 mb-6">Semana 13-19 julio</p>

                        <div className="flex flex-col gap-3 mb-4">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="flex items-center gap-4 cursor-pointer" onClick={() => toggleDaySelection(day)}>
                                    <button 
                                        className="w-6 h-6 flex items-center justify-center border-2 border-slate-700 rounded-sm bg-white"
                                    >
                                        {selectedDays.includes(day) && <FiCheck className="text-xl text-slate-700" />}
                                    </button>
                                    <span className="text-slate-700">{day}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={toggleAllDays}
                            className="text-slate-500 text-sm mb-8 hover:text-slate-800 font-medium"
                        >
                            Seleccionar todos
                        </button>

                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={handleCancelRequest}
                                className="px-6 py-2 border-2 border-slate-700 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => setActiveModal("none")} 
                                className="px-6 py-2 bg-gray-300 border-2 border-slate-700 rounded-xl text-slate-800 font-medium hover:bg-gray-400 transition-colors"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === "recipe" && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                    <div className="bg-[#fcfaf8] w-full max-w-3xl rounded-3xl p-8 shadow-xl relative border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-2xl font-medium text-slate-700">
                                <FiChevronLeft className="text-3xl cursor-pointer" onClick={handleCancelRequest}/>
                                Buscar
                            </div>
                            <button onClick={handleCancelRequest} className="text-slate-500 hover:text-slate-800">
                                <FiX className="text-3xl" />
                            </button>
                        </div>

                        <div className="relative mb-8">
                            <input 
                                type="text" 
                                placeholder="Buscar receta..." 
                                className="w-full border-2 border-slate-700 rounded-full px-6 py-3 bg-white focus:outline-none focus:border-sage-green text-lg pr-12"
                            />
                            <FiSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                        </div>

                        <h3 className="text-xl font-medium text-slate-800 mb-4">Recetas recientes</h3>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8 max-h-[40vh] overflow-y-auto p-1">
                            {recipes.map((receta) => (
                                <div 
                                    key={receta.id} 
                                    onClick={() => setSelectedRecipeId(receta.id)}
                                    className={`bg-sage-green/15 border-2 p-3 flex flex-col cursor-pointer transition-all ${
                                        selectedRecipeId === receta.id 
                                        ? 'border-sage-green ring-4 ring-sage-green/30 bg-sage-green/30' 
                                        : 'border-sage-green/60 hover:bg-sage-green/25'
                                    }`}
                                >
                                    <div className="w-full h-40 overflow-hidden mb-3">
                                        <img 
                                            src={receta.urlPhoto} 
                                            alt={receta.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h4 className="text-slate-800 text-xl font-medium mb-2">{receta.name}</h4>
                                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <span>Tiempo: {receta.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>Porciones: {receta.portions}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-4 mt-4 pr-4">
                            <button 
                                onClick={handleCancelRequest}
                                className="px-8 py-2 border-2 border-slate-700 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleAddRecipe}
                                className="px-8 py-2 bg-gray-300 border-2 border-slate-700 rounded-xl text-slate-800 font-medium hover:bg-gray-400 transition-colors disabled:opacity-50"
                                disabled={selectedRecipeId === null}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmDialog 
                isOpen={showConfirmCancel}
                title="¿Cancelar acción?"
                message="Se perderán los datos que no hayas guardado. ¿Estás seguro que deseas salir?"
                onConfirm={confirmCancel}
                onCancel={abortCancel}
            />
            <ConfirmDialog 
                isOpen={itemToDelete !== null}
                title="¿Eliminar producto?"
                message="¿Estás seguro que deseas eliminar este elemento de tu lista de compras?"
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
}

export default ShoppingList;