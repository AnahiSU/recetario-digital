import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiChevronLeft, FiClock, FiPlus, FiMinus, FiUpload, FiTrash2, FiX } from "react-icons/fi";
import { useRecipes, type Ingredient } from "../context/RecipesContext";

const CATEGORIAS = ["Postres", "Ensaladas", "Platos Principales", "Sopas", "Bebidas", "General"];

function RecipeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getRecipeById, addRecipe, updateRecipe } = useRecipes();
    const isEditing = Boolean(id);

    const [name, setName] = useState("");
    const [portions, setPortions] = useState(1);
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ quantity: "", name: "" }]);
    const [preparation, setPreparation] = useState<string[]>([""]);
    const [notes, setNotes] = useState<string[]>([]);

    // Modales
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const receta = getRecipeById(id);
            if (receta) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setName(receta.name);
                setPortions(parseInt(receta.portions) || 1);
                setTime(receta.time);
                setCategory(receta.category);
                setUrlPhoto(receta.urlPhoto);
                setIngredients(receta.ingredients.length ? receta.ingredients : [{ quantity: "", name: "" }]);
                setPreparation(receta.preparation.length ? receta.preparation : [""]);
                setNotes(receta.notes);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing, id]);

    function handleIngredientChange(index: number, field: keyof Ingredient, value: string) {
        setIngredients(prev => prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)));
    }
    const addIngredientRow = () => setIngredients(prev => [...prev, { quantity: "", name: "" }]);
    const removeIngredientRow = (index: number) => setIngredients(prev => prev.filter((_, i) => i !== index));

    const handlePreparationChange = (index: number, value: string) =>
        setPreparation(prev => prev.map((p, i) => (i === index ? value : p)));
    const addPreparationRow = () => setPreparation(prev => [...prev, ""]);
    const removePreparationRow = (index: number) => setPreparation(prev => prev.filter((_, i) => i !== index));

    const addNote = () => setNotes(prev => [...prev, ""]);
    const handleNoteChange = (index: number, value: string) =>
        setNotes(prev => prev.map((n, i) => (i === index ? value : n)));
    const removeNote = (index: number) => setNotes(prev => prev.filter((_, i) => i !== index));

    function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setUrlPhoto(URL.createObjectURL(file));
        }
    }

    function handleSave() {
        const recipeData = {
            name: name.trim() || "Receta sin nombre",
            time: time.trim() || "--",
            portions: `${portions} ${portions === 1 ? "persona" : "personas"}`,
            urlPhoto,
            category: category || "General",
            ingredients: ingredients.filter(i => i.name.trim() !== ""),
            preparation: preparation.filter(p => p.trim() !== ""),
            notes: notes.filter(n => n.trim() !== ""),
        };
        if (isEditing && id) {
            updateRecipe(id, recipeData);
        } else {
            addRecipe(recipeData);
        }
        // Mostramos el modal de éxito; la navegación ocurre cuando el usuario acepta
        setShowSuccess(true);
    }

    function handleSuccessAccept() {
        setShowSuccess(false);
        if (isEditing && id) {
            navigate(`/receta/${id}`);
        } else {
            navigate("/mis-recetas");
        }
    }

    function handleCancelClick() {
        setShowCancelConfirm(true);
    }

    function handleCancelConfirmAccept() {
        setShowCancelConfirm(false);
        navigate(isEditing && id ? `/receta/${id}` : "/mis-recetas");
    }

    return (
        <div className="p-8 w-full max-w-5xl mx-auto font-poppins text-slate-800 relative">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/mis-recetas" className="hover:text-sage-green transition-colors">
                    <FiChevronLeft className="text-3xl" />
                </Link>
                <h1 className="text-3xl font-semibold">{isEditing ? "Editar receta" : "Nueva receta"}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna izquierda */}
                <div className="col-span-2 flex flex-col gap-6">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nombre Receta"
                        className="border-2 border-sage-green/40 rounded-md px-4 py-2 text-lg focus:outline-none focus:border-sage-green"
                    />
                    <div className="flex items-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2">
                            <span>Porciones:</span>
                            <button type="button" onClick={() => setPortions(p => Math.max(1, p - 1))}
                                className="p-1 border border-sage-green/60 rounded hover:bg-sage-green/15">
                                <FiMinus />
                            </button>
                            <span className="w-6 text-center">{portions}</span>
                            <button type="button" onClick={() => setPortions(p => p + 1)}
                                className="p-1 border border-sage-green/60 rounded hover:bg-sage-green/15">
                                <FiPlus />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Tiempo:</span>
                            <input
                                type="text"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                placeholder="Ej: 30 min"
                                className="border border-sage-green/40 rounded-md px-2 py-1 w-24 text-center"
                            />
                            <FiClock className="text-xl" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Etiqueta:</span>
                            <select value={category} onChange={e => setCategory(e.target.value)}
                                className="border border-sage-green/40 rounded-md px-2 py-1">
                                <option value="">Seleccionar categoría</option>
                                {CATEGORIAS.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="border-2 border-sage-green/40 rounded-sm p-4">
                        <h2 className="text-lg font-medium mb-3">Ingredientes:</h2>
                        <div className="flex flex-col gap-2">
                            {ingredients.map((ing, index) => (
                                <div key={index} className="flex items-center gap-2 min-w-0">
                                    <input type="text" value={ing.quantity}
                                        onChange={e => handleIngredientChange(index, "quantity", e.target.value)}
                                        placeholder="Cantidad"
                                        className="border-b border-gray-400 px-1 py-1 text-sm w-1/3 min-w-0 focus:outline-none" />
                                    <input type="text" value={ing.name}
                                        onChange={e => handleIngredientChange(index, "name", e.target.value)}
                                        placeholder="Ingrediente"
                                        className="border-b border-gray-400 px-1 py-1 text-sm flex-1 min-w-0 focus:outline-none" />
                                    <button type="button" onClick={() => removeIngredientRow(index)}
                                        className="shrink-0">
                                        <FiTrash2 className="text-gray-400 hover:text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addIngredientRow}
                            className="mt-3 text-sm text-sage-green flex items-center gap-1 hover:underline">
                            <FiPlus /> Agregar ingrediente
                        </button>
                    </div>
                    <div className="border-2 border-sage-green/40 rounded-sm p-4">
                        <h2 className="text-lg font-medium mb-3">Preparación:</h2>
                        <div className="flex flex-col gap-2">
                            {preparation.map((paso, index) => (
                                <div key={index} className="flex items-center gap-2 min-w-0">
                                    <span className="text-sm text-gray-500 shrink-0">{index + 1}.</span>
                                    <input type="text" value={paso}
                                        onChange={e => handlePreparationChange(index, e.target.value)}
                                        placeholder="Describe el paso"
                                        className="border-b border-gray-400 px-1 py-1 text-sm flex-1 min-w-0 focus:outline-none" />
                                    <button type="button" onClick={() => removePreparationRow(index)}
                                        className="shrink-0">
                                        <FiTrash2 className="text-gray-400 hover:text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addPreparationRow}
                            className="mt-3 text-sm text-sage-green flex items-center gap-1 hover:underline">
                            <FiPlus /> Agregar paso
                        </button>
                    </div>
                </div>
                {/* Columna derecha */}
                <div className="col-span-1 flex flex-col gap-6">
                    <div className="h-64 border-2 border-dashed border-gray-300 rounded-sm flex items-center justify-center overflow-hidden">
                        {urlPhoto ? (
                            <img src={urlPhoto} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-300 text-sm">Sin foto</span>
                        )}
                    </div>
                    <label className="flex items-center justify-center gap-2 border border-sage-green/60 rounded-full py-2 cursor-pointer hover:bg-sage-green/15 text-sm">
                        <FiUpload /> Subir foto
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    <div className="border-2 border-sage-green/40 rounded-sm p-4">
                        <h2 className="text-lg font-medium mb-3">Notas:</h2>
                        <div className="flex flex-col gap-2">
                            {notes.map((nota, index) => (
                                <div key={index} className="flex items-center gap-2 min-w-0">
                                    <input type="text" value={nota}
                                        onChange={e => handleNoteChange(index, e.target.value)}
                                        placeholder="Nota"
                                        className="border-b border-gray-400 px-1 py-1 text-sm flex-1 min-w-0 focus:outline-none" />
                                    <button type="button" onClick={() => removeNote(index)}
                                        className="shrink-0">
                                        <FiTrash2 className="text-gray-400 hover:text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addNote}
                            className="mt-3 text-sm text-sage-green flex items-center gap-1 hover:underline">
                            <FiPlus /> Agregar nota
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={handleCancelClick}
                    className="px-6 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                    Cancelar
                </button>
                <button onClick={handleSave}
                    className="px-6 py-2 rounded-md bg-terracotta text-white hover:opacity-90 transition-opacity text-sm">
                    Guardar
                </button>
            </div>

            {/* Modal: confirmar cancelación */}
            {showCancelConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                        <button
                            type="button"
                            onClick={() => setShowCancelConfirm(false)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                        >
                            <FiX className="text-xl" />
                        </button>
                        <p className="text-center text-slate-700 mb-6 mt-2">
                            Los cambios realizados se perderán, ¿estás seguro que quieres continuar?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowCancelConfirm(false)}
                                className="px-6 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelConfirmAccept}
                                className="px-6 py-2 rounded-md bg-terracotta text-white hover:opacity-90 transition-opacity text-sm"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: guardado con éxito */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                        <button
                            type="button"
                            onClick={handleSuccessAccept}
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                        >
                            <FiX className="text-xl" />
                        </button>
                        <p className="text-center text-slate-700 mb-6 mt-2">
                            ¡Receta guardada con éxito!
                        </p>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleSuccessAccept}
                                className="px-6 py-2 rounded-md bg-terracotta text-white hover:opacity-90 transition-opacity text-sm"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecipeForm;