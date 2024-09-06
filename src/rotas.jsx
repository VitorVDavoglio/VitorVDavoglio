import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import Projetos from "./pages/projetos/projetos.jsx";
import Login from "./pages/login/login.jsx";


function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;