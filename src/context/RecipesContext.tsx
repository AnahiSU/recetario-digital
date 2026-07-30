import { createContext, useContext, useState, type ReactNode } from "react";
import initialRecipes from "../mocks/recipes.json" with { type: "json" };

export interface Ingredient {
    quantity: string;
    name: string;
}

export interface Recipe {
    id: number;
    name: string;
    time: string;
    portions: string;
    urlPhoto: string;
    category: string;
    ingredients: Ingredient[];
    preparation: string[];
    notes: string[];
}

interface RecipesContextType {
    recipes: Recipe[];
    getRecipeById: (id: string | number) => Recipe | undefined;
    deleteRecipe: (id: string | number) => void;
    addRecipe: (recipe: Omit<Recipe, "id">) => Recipe;
    updateRecipe: (id: string | number, recipe: Omit<Recipe, "id">) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
    const [recipes, setRecipes] = useState<Recipe[]>(() =>
        JSON.parse(JSON.stringify(initialRecipes))
    );

    function getRecipeById(id: string | number) {
        return recipes.find(r => r.id.toString() === id.toString());
    }

    function deleteRecipe(id: string | number) {
        setRecipes(prev => prev.filter(r => r.id.toString() !== id.toString()));
    }

    function addRecipe(recipe: Omit<Recipe, "id">) {
        const newId = recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
        const newRecipe: Recipe = { id: newId, ...recipe };
        setRecipes(prev => [...prev, newRecipe]);
        return newRecipe;
    }

    function updateRecipe(id: string | number, recipe: Omit<Recipe, "id">) {
        setRecipes(prev =>
            prev.map(r => (r.id.toString() === id.toString() ? { id: r.id, ...recipe } : r))
        );
    }

    return (
        <RecipesContext.Provider
            value={{ recipes, getRecipeById, deleteRecipe, addRecipe, updateRecipe }}
        >
            {children}
        </RecipesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecipes() {
    const ctx = useContext(RecipesContext);
    if (!ctx) throw new Error("useRecipes debe usarse dentro de RecipesProvider");
    return ctx;
}