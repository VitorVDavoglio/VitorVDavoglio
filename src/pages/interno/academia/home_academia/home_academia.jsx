import "./home_academia.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiWeb from "../../../../services/apiWeb.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";

function HomeAcamedia(){

    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    function InicioNovoTreino(){

    }

    return <>
    
        <Navbar Interno />

        <div className="container">
            <h2>Página Academia</h2>

            <button className="quadrado-iniciar-treino">
                <p>Iniciar novo treino</p>
            </button> 

            <div className="div-treino-ativo">
                <h3>Treino ativo:</h3>
            </div>
        </div>

    </>
}

export default HomeAcamedia;