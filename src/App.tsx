import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import SearchReceipts from "./pages/SearchReceipts";
import MyRecipes from "./pages/MyRecipes";
import WeeklyMenu from "./pages/WeeklyMenu";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeForm from "./pages/RecipeForm";
import ShoppingList from "./pages/ShoppingList";
import { RecipesProvider } from "./context/RecipesContext";

function App() {
    return (
        <RecipesProvider>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate to="/buscar" replace />} />
                    <Route path="buscar" element={<SearchReceipts />} />
                    <Route path="mis-recetas" element={<MyRecipes />} />
                    <Route path="mis-recetas/:id" element={<RecipeDetail />} />
                    <Route path="menu-semanal" element={<WeeklyMenu />} />
                    <Route path="perfil" element={<Profile />} />
                    <Route path="receta/:id" element={<RecipeDetail />} />
                    <Route path="receta/nueva" element={<RecipeForm />} />
                    <Route path="receta/editar/:id" element={<RecipeForm />} />
                    <Route path="carrito" element={<ShoppingList />} />
                </Route>
            </Routes>
        </RecipesProvider>
    );
}
export default App;