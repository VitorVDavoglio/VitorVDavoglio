import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import Projetos from "./pages/projetos/projetos.jsx";


function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;