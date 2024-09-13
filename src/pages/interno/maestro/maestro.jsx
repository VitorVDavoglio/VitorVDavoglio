import "./maestro.css";
import Navbar from "../../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import apiWeb from "../../../services/apiWeb.js";
import { CONSTANTES_SERVER } from "../../../style/const.js";

function Maestro(){
    document.body.style= 'background-color: #00000';
    

    return <>

        <Navbar Interno />

        <div className="container">
            <h2>Página Maestro</h2>
        </div>
    
    </>
}

export default Maestro;