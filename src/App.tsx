import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import SearchReceipts from "./pages/SearchReceipts";
import MyRecipes from "./pages/MyRecipes";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/buscar" replace />} />
                <Route path="buscar" element={<SearchReceipts />} />
                <Route path="mis-recetas" element={<MyRecipes />} />
            </Route>
        </Routes>
    );
}

export default App;
