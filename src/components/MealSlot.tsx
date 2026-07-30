import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import RecipeSearchModal from "./RecipeSearchModal";
import Toast from "./Toast";

export interface Meal {
    id: number;
    name: string;
    urlPhoto: string;
    time?: string;
    portions?: string;
}

interface MealSlotProps {
    label: string;
    meal: Meal | null;
    onSelect: (meal: Meal) => void;
    onRemove: () => void;
}
function MealSlot({ label, meal, onSelect, onRemove }: MealSlotProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [removeToast, setRemoveToast] = useState(false);
    function handleRemove() {
        onRemove();
        setRemoveToast(true);
    }
    return (
        <div className="relative flex flex-col items-center gap-3 font-poppins">
            <span className="text-sm font-medium text-slate-700">{label}</span>

            {meal ? (
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-blue/30 group">
                        <img
                            src={meal.urlPhoto}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={handleRemove}
                            aria-label={`Quitar ${meal.name}`}
                            className="absolute top-1 right-1 bg-white/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity text-terracotta hover:bg-white"
                        >
                            <FiX size={14} />
                        </button>
                    </div>
                    <span className="text-sm text-slate-800 text-center max-w-[7rem]">
                        {meal.name}
                    </span>
                </div>
            ) : (
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex flex-col items-center gap-2 text-slate-500 hover:text-sage-green transition-colors"
                >
                    <span className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-slate-400 hover:border-sage-green transition-colors">
                        <FiPlus size={20} />
                    </span>
                    <span className="text-sm">Agregar receta</span>
                </button>
            )}

            <RecipeSearchModal
                isOpen={modalOpen}
                mealLabel={label}
                onClose={() => setModalOpen(false)}
                onSave={onSelect}
            />

            {removeToast && (
                <Toast
                    message="Receta quitada"
                    type="info"
                    variant="floating"
                    onDone={() => setRemoveToast(false)}
                />
            )}
        </div>
    );
}
export default MealSlot;