import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import Projetos from "./pages/projetos/projetos.jsx";
import Login from "./pages/login/login.jsx";

import HomeInterno from "./pages/interno/home_interno/home_interno.jsx";
import Maestro from "./pages/interno/maestro/maestro.jsx";
import HomeAcamedia from "./pages/interno/academia/home_academia/home_academia.jsx";
import CadastroExerc from "./pages/interno/academia/cadastro_exerc/cadastro_exerc.jsx";
import CadastroSerie from "./pages/interno/academia/cadastro_serie/cadastro_serie.jsx";


function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/home" element={<HomeInterno />} />
            <Route path="/maestro" element={<Maestro />} />
            <Route path="/home/academia" element={<HomeAcamedia />} />
            <Route path="/academia/cadastro/exercicio" element={<CadastroExerc />} />
            <Route path="/academia/cadastro/serie" element={<CadastroSerie />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;