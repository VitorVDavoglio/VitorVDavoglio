import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import Projetos from "./pages/projetos/projetos.jsx";
import Login from "./pages/login/login.jsx";

import HomeInterno from "./pages/interno/home_interno/home_interno.jsx";
import Maestro from "./pages/interno/maestro/maestro.jsx";
import HomeAcamedia from "./pages/interno/academia/home_academia/home_academia.jsx";


function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/home" element={<HomeInterno />} />
            <Route path="/maestro" element={<Maestro />} />
            <Route path="/home/academia" element={<HomeAcamedia />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;