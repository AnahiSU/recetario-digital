import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import SearchReceipts from "./pages/SearchReceipts";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="buscar" element={<SearchReceipts />} />
                <Route index element={<Navigate to="/buscar" replace />} />
            </Route>
        </Routes>
    );
}

export default App;