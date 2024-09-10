import "./home_academia.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiWeb from "../../../../services/apiWeb.js";
import apiTeste from "../../../../services/apiTeste.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";

function HomeAcamedia(){

    const navigate = useNavigate();
    const [dataInicio, setDataInicio] = useState('');
    const username = CONSTANTES_SERVER.credentials_username;
    const password = CONSTANTES_SERVER.credentials_password;
    const credentials = btoa(`${username}:${password}`);

    useEffect(() => {
        if(dataInicio){
            alert(dataInicio);
            SalvarInicio();
            
        }
    }, [dataInicio])

    function InicioNovoTreino(){
        setDataInicio(new Date());
    }

    async function SalvarInicio() {
        await apiTeste.get(`acad/treino/criar?hora_inicio=${dataInicio}`, {
            headers: {
                'Authorization' : `Basic ${credentials}`,
            }
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return <>
    
        <Navbar Interno />

        <div className="container">
            <h2>Página Academia</h2>

            <button className="quadrado-iniciar-treino" onClick={InicioNovoTreino}>
                <p>Iniciar novo treino</p>
            </button> 

            <div className="div-treino-ativo">
                <h3>Treino ativo:</h3>
            </div>
        </div>

    </>
}

export default HomeAcamedia;