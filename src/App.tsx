import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import SearchReceipts from "./pages/SearchReceipts";
import MyRecipes from "./pages/MyRecipes";
import WeeklyMenu from "./pages/WeeklyMenu";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/RecipeDetail";
import ShoppingList from "./pages/ShoppingList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/buscar" replace />} />
                <Route path="buscar" element={<SearchReceipts />} />
                <Route path="mis-recetas" element={<MyRecipes />} />
                <Route path="mis-recetas/:id" element={<RecipeDetail />} />
                <Route path="menu-semanal" element={<WeeklyMenu />} />
                <Route path="perfil" element={<Profile />} />
                <Route path="receta/:id" element={<RecipeDetail />} />
                <Route path="carrito" element={<ShoppingList/>} />
            </Route>
        </Routes>
    );
}

export default App;
