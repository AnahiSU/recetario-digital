import { useState } from "react";
import { FiChevronLeft, FiX, FiSearch, FiClock, FiUser } from "react-icons/fi";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";
import { type Meal } from "./MealSlot";
import recipes from "../mocks/recipes.json" with { type: "json" };

interface RecipeSearchModalProps {
    isOpen: boolean;
    mealLabel: string;
    onClose: () => void;
    onSave: (meal: Meal) => void;
}

function RecipeSearchModal({ isOpen, mealLabel, onClose, onSave }: RecipeSearchModalProps) {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) {
            setQuery("");
            setSelectedId(null);
            setConfirmOpen(false);
            setToast(null);
        }
    }

    if (!isOpen) return null;

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    const selectedRecipe = recipes.find((recipe) => recipe.id === selectedId) ?? null;

    function requestCancel() {
        setConfirmOpen(true);
    }

    function confirmCancel() {
        setConfirmOpen(false);
        setToast({ message: "Cambios cancelados", type: "info" });
    }

    function handleSave() {
        if (!selectedRecipe) return;
        setToast({ message: "Guardado con éxito", type: "success" });
    }

    function handleToastDone() {
        const shouldSave = toast?.type === "success" && selectedRecipe;
        setToast(null);
        if (shouldSave && selectedRecipe) {
            onSave(selectedRecipe);
        }
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={requestCancel}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 font-poppins"
            >

                <div className="flex items-center justify-between mb-5">
                    <button
                        onClick={requestCancel}
                        className="inline-flex items-center gap-1 text-xl font-medium text-slate-800 hover:text-sage-green transition-colors"
                    >
                        <FiChevronLeft className="text-2xl" />
                        Buscar
                    </button>
                    <button
                        onClick={requestCancel}
                        aria-label="Cerrar"
                        className="text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                    {mealLabel}
                </p>

                <div className="relative mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar receta..."
                        className="w-full rounded-full border border-slate-300 bg-slate-50 pl-4 pr-10 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-blue transition-colors"
                    />
                    <FiSearch
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                </div>

                <h4 className="text-lg text-slate-800 mb-4">
                    {query ? "Resultados" : "Recetas recientes"}
                </h4>

                {filteredRecipes.length === 0 ? (
                    <p className="text-sm text-slate-500 mb-6">
                        No se encontraron recetas con ese nombre.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-4 mb-6 max-h-80 overflow-y-auto">
                        {filteredRecipes.map((recipe) => {
                            const isSelected = recipe.id === selectedId;
                            return (
                                <button
                                    key={recipe.id}
                                    onClick={() => setSelectedId(recipe.id)}
                                    className={`text-left rounded-xl border-2 overflow-hidden transition-colors ${
                                        isSelected
                                            ? "border-sage-green"
                                            : "border-slate-200 hover:border-slate-blue/50"
                                    }`}
                                >
                                    <img
                                        src={recipe.urlPhoto}
                                        alt={recipe.name}
                                        className="w-full h-28 object-cover"
                                    />
                                    <div className="p-3">
                                        <p className="text-slate-800 font-medium mb-2 truncate">
                                            {recipe.name}
                                        </p>
                                        <p className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                                            <FiClock size={12} />
                                            Tiempo: {recipe.time}
                                        </p>
                                        <p className="flex items-center gap-1 text-xs text-slate-500">
                                            <FiUser size={12} />
                                            Porciones: {recipe.portions}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={requestCancel}
                        className="px-5 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedRecipe}
                        className="px-5 py-2 rounded-md bg-slate-blue text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Guardar
                    </button>
                </div>

                {confirmOpen && (
                    <ConfirmDialog
                        isOpen={confirmOpen}
                        title="¿Seguro que quieres cancelar?"
                        message="Vas a perder la seleccion que hiciste en esta ventana."
                        confirmLabel="Si, cancelar"
                        cancelLabel="Seguir buscando"
                        onConfirm={confirmCancel}
                        onCancel={() => setConfirmOpen(false)}
                    />
                )}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onDone={handleToastDone}
                    />
                )}
            </div>
        </div>
    );
}

export default RecipeSearchModal;