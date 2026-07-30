import { useEffect, useMemo, useRef, useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useRecipes } from "../context/RecipesContext";
import ReceiptCard from "../components/ReceiptCard";

export default function MyRecipes() {
  const { recipes } = useRecipes();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(recipes.map((r) => r.category).filter(Boolean)));
    return unique;
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (!selectedCategory) return recipes;
    return recipes.filter((r) => r.category === selectedCategory);
  }, [recipes, selectedCategory]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectCategory(category: string | null) {
    setSelectedCategory(category);
    setIsOpen(false);
  }

  return (
    <>
      <div className="p-4 sm:p-8">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <h2 className="font-poppins font-medium text-xl sm:text-2xl">
              {selectedCategory ?? "Mis Recetas"}
            </h2>
            <TbTriangleInvertedFilled
              className={`text-sm text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-slate-300 shadow-md z-20 font-poppins">
              <button
                type="button"
                onClick={() => handleSelectCategory(null)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 border-b border-slate-200 ${
                  selectedCategory === null ? "bg-slate-100 font-medium" : ""
                }`}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 border-b border-slate-200 last:border-b-0 ${
                    selectedCategory === category ? "bg-slate-100 font-medium" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 sm:p-10 flex justify-center">
        {filteredRecipes.length === 0 ? (
          <p className="font-poppins text-slate-500 py-10">
            No hay recetas en esta categoría todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 w-full max-w-5xl">
            {filteredRecipes.map((recipe) => (
              <ReceiptCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.time}
                portions={recipe.portions}
                urlPhoto={recipe.urlPhoto}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}