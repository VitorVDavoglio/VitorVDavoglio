import "./home_academia.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiWeb from "../../../../services/apiWeb.js";
import apiTeste from "../../../../services/apiTeste.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";


function HomeAcamedia(props){

    const navigate = useNavigate();
    const [treinoIniciado, setTreinoIniciado] = useState(false);
    const [mensagemServidor, setMensagemServidor] = useState("");
    const [treinosAbertos, setTreinosAbertos] = useState([]);

    useEffect(() => {
        TreinosAbertos();
    }, []);

    async function InicioNovoTreino() {
       let now = new Date()


       let dataSeparda = now.getDate();
       let mesSeparda = now.getMonth();
       let anoSeparda = now.getFullYear();
       let horaSeparda = now.getHours();
       let minSeparda = now.getMinutes();
       let segSeparda = now.getSeconds();
      
       let dataCompleta = (anoSeparda + "-" + mesSeparda  + "-" + dataSeparda + " " + horaSeparda + ":" + minSeparda + ":" + segSeparda)

        await apiTeste.get(`acad/treino/criar?hora_inicio=${dataCompleta}`)
        .then(resp => {
            console.log(resp);
            if(resp.request.status === 200){
                setMensagemServidor('Treino iniciado com sucesso');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    async function TreinosAbertos() {

        await apiTeste.get(`acad/treinoAberto`)
        .then(resp => {
            console.log(resp);
            setTreinosAbertos(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function CadastrarTreino(key, data){
        navigate("/academia/cadastro/exercicio", {state:{key_treino: key, data: data}})
    }


    return <>
  
        <Navbar Interno />

        <div className="container">
            <h2>Página Academia</h2>

            <div>
                <button className="quadrado-iniciar-treino" onClick={InicioNovoTreino}>
                    <p>Iniciar novo treino</p>
                </button>
                <p>{mensagemServidor}</p>
            </div>

            <div className="div-treino-ativo">
                <h3>Treino ativo:</h3>
            </div>

            <div>
                {treinosAbertos.map(treinos => {
                    return <div>
                        <button className="" onClick={() => CadastrarTreino(treinos.id_treino, treinos.data_inicio)}>
                            <p>{treinos.id_treino}</p>
                            <p>{treinos.data_inicio}</p>
                        </button>
                    </div>
                })}
            </div>

        </div>
    </>
}

export default HomeAcamedia;
