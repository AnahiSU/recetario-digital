import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import recipes from "../mocks/recipes.json" with { type: "json" };

function handleDeleteRecipe() {
  console.log("delete");
}

export default function RecipeDetail() {
  const params = useParams();
  const id = Number(params.id) - 1;
  const recipe = recipes[id];
  return (
    <div className="p-8 font-poppins">
      <div className="flex flex-col">
        <div className="flex gap-64">
          <div className="flex flex-col gap-4">
            <Link
              to="/mis-recetas"
              className="inline-flex items-center gap-2 text-2xl font-medium text-slate-800 hover:text-sage-green transition-colors w-fit"
              >
              <FiChevronLeft className="text-3xl" />
              {recipes[id].name}
            </Link>
            <p className="mt-2">Tiempo: {recipe.time}</p>
          </div>
          <div className="flex flex-col grow gap-4">
            <div className="flex justify-between items-center">
              <span className="p-2 bg-slate-blue text-(--color-cream) text-xl rounded-md">
                Categoria: {recipe.category}
              </span>
              <div className="flex gap-4">
                <Link to="/nueva-receta">
                  <div className="rounded-md bg-slate-50 p-3 border border-slate-300 hover:border-slate-blue transition-colors">
                    <FiEdit2 size={20} className="text-(--color-slate-blue)" />
                  </div>
                </Link>
                <button onClick={handleDeleteRecipe} className="cursor-pointer">
                  <div className="rounded-md bg-slate-50 p-3 border border-slate-300 hover:border-(--color-terracotta) transition-colors">
                    <FiTrash2 size={20} className="text-(--color-terracotta)" />
                  </div>
                </button>
              </div>
            </div>
            <p>Porciones: {recipe.portions}</p>
          </div>
        </div>
        <div>
          Preparacion
        </div>
      </div>
    </div>
  );
}
