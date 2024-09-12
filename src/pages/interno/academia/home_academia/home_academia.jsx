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
    const [treinoAbertoOrga, setTreinoAbertoOrga] = useState([]);

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
            if(err.response.status === 400){
                setMensagemServidor(err.response.data);
            }
        })
    }

    async function TreinosAbertos() {

        await apiTeste.get(`acad/treinoAberto`)
        .then(resp => {
            console.log(resp);
            console.log(resp.data);
            setTreinosAbertos(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function CadastrarExercicio(key, data){
        navigate("/academia/cadastro/exercicio", {state:{acao: 'adicionarExerc',key_treino: key, data: data}});
    }

    function AbrirTreino(key, data){
        navigate("/academia/cadastro/exercicio", {state:{acao: 'verTreino',key_treino: key, data: data}});
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
                <h2>Treino ativo:</h2>
            </div>

            <div>
                {treinosAbertos.map(treinos => {
                    return <div className="div-treino-separado">
                            <h4>Início do treino: {treinos.data_inicio}</h4>
                            <button className="button-treino-novo-exercicio" onClick={() => CadastrarExercicio(treinos.id_treino, treinos.data_inicio)}>
                                <p>Adicionar exercício</p>
                            </button>
                            <div>
                                <p>Grupo Muscular: Dorsal(2)</p>
                            </div>    
                            <button className="button-treino-abrir-exercicio" onClick={() => AbrirTreino(treinos.id_treino, treinos.data_inicio)}>
                                <p>Abrir Treino</p>
                            </button>
                    </div>
                })}
            </div>

        </div>
    </>
}

export default HomeAcamedia;
