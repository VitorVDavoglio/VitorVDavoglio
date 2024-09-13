import "./home_academia.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiWeb from "../../../../services/apiWeb.js";
import apiTeste from "../../../../services/apiTeste.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";

import ModalConfirmacao from "../../../../components/modals/modal_confirmacao/modal_confirmacao.jsx";

function HomeAcamedia(props){
    document.body.style.backgroundColor= '#0E1419';
    document.body.style.color= '#F2F4F7';

    const navigate = useNavigate();
    const [treinoIniciado, setTreinoIniciado] = useState(false);
    const [treinosAbertos, setTreinosAbertos] = useState([]);
    const [treinosFechados, setTreinosFechados] = useState([]);

    const [isModalConfirmacaoOpen, setIsModalConfirmacaoOpen] = useState(false);

    function openModalConfirmacao(event){
        setIsModalConfirmacaoOpen(true);
    }
    
    function closeModalConfirmacao(){
        setIsModalConfirmacaoOpen(false);
    }

    useEffect(() => {
        setTreinosAbertos([]);
        setTreinosFechados([]);
        PuxarTreino();
    }, []);

    async function PuxarTreino() {
        await apiTeste.get(`acad/puxarTreino`)
        .then(resp => {
            resp.data.map(treinos => {
                if(treinos.data_fim){
                    setTreinosFechados(treinosFechados => [...treinosFechados, treinos])
                }else{
                    setTreinosAbertos(treinosAbertos => [...treinosAbertos, treinos])
                }
            })
        })
        .catch(err => {
            console.log(err);
            alert(err);
        })
    }

    const handleConfirmNewTraining = (confirmed) => {
        if(confirmed){
            console.log("Novo treino confirmado!");
            InicioNovoTreino();
        }else{
            console.log("Novo treino cancelado!");
        }
        setIsModalConfirmacaoOpen(false);
    };

    async function InicioNovoTreino() {
       let now = new Date()

       let dataSeparda = now.getDate();
       let mesSeparda = now.getMonth() + 1;
        mesSeparda = mesSeparda < 10 ? "0" + mesSeparda : mesSeparda;
       let anoSeparda = now.getFullYear();
       let horaSeparda = now.getHours();
       let minSeparda = now.getMinutes();
       let segSeparda = now.getSeconds();
      
       let dataCompleta = (anoSeparda + "-" + mesSeparda  + "-" + dataSeparda + " " + horaSeparda + ":" + minSeparda + ":" + segSeparda)

        await apiTeste.get(`acad/treino/criar?hora_inicio=${dataCompleta}`)
        .then(resp => {
            console.log(resp);
            if(resp.request.status === 200){
                setTreinosAbertos([]);
                PuxarTreino();
            }
        })
        .catch(err => {
            console.log(err);
            if(err.response.status === 400){
                alert(err.response.data);
            }
        })
    }

    function AbrirTreino(key, data_inicio, data_fim){
        navigate("/academia/cadastro/exercicio", {state:{key_treino: key, data_inicio: data_inicio, data_fim: data_fim}});
    }

    function ArrumarData(data){        
        const dataCompleta = new Date(data)

        const diaSemana = dataCompleta.getDay()
        const dia = dataCompleta.getDate();
        const mes = dataCompleta.getMonth() + 1;
        const ano = dataCompleta.getFullYear();

        const dataExibir = `${dia}/${mes}/${ano}`

        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const diaFeito = diasDaSemana[diaSemana];

        return(`${diaFeito} - ${dataExibir}`);
    }

    function ArrumarHora(hora){
        const dataCompleta = new Date(hora);

        const horaSeparada = dataCompleta.getHours();
        const minSeparada = dataCompleta.getMinutes();
        return(`${horaSeparada}:${minSeparada}`);
    }

    return <div className="pagina-home-academia">
  
        <Navbar 
            Interno 
            fundoBlack
        />

        <ModalConfirmacao 
            isOpen={isModalConfirmacaoOpen}
            onRequestClose={closeModalConfirmacao}
            titulo='treino'
            onConfirm={handleConfirmNewTraining}
        />

        <div className="container">
            <h2>Página Treinos Academia</h2>

            <div className="div-treino-ativo">
                <h2>Treino ativo:</h2>
            </div>

            <div>
                {treinosAbertos.map(treinos => {
                    return <div className="div-treino-separado">
                            <h4 className="titulo-treino-aberto">Treino: {ArrumarData(treinos.data_inicio)}</h4>
                            <div className="div-treino-separado-horarios"> 
                                <h5>Início: {ArrumarHora(treinos.data_inicio)}</h5>
                            </div>
                            <div>
                                <p>Grupo Muscular: ex: Dorsal(2)</p>
                            </div>    
                            <button className="button-treino-abrir-exercicio" onClick={() => AbrirTreino(treinos.id_treino, treinos.data_inicio, treinos.data_fim)}>
                                <p>Abrir Treino</p>
                            </button>
                    </div>
                })}

                <div className="div-home-academia-button-iniciar-treino">
                    <button className="button-iniciar-treino" onClick={openModalConfirmacao}>
                        <p>Iniciar novo treino</p>
                    </button>
                </div>
            </div>
            

            <div className="div-treino-concluido">
                <h2>Treinos Concluídos</h2>
            </div>
            
            <div>
                {treinosFechados.map(treinos => {
                    return <div className="div-treino-separado">
                            <h4>Treino: {ArrumarData(treinos.data_inicio)}</h4>
                            <div className="div-treino-separado-horarios"> 
                                <h5>Início: {ArrumarHora(treinos.data_inicio)}</h5>
                                <h5>Fim: {ArrumarHora(treinos.data_fim)}</h5>
                            </div>
                            <div>
                                <p>Grupo Muscular: ex: Dorsal(2)</p>
                            </div>    
                            <button className="button-treino-abrir-exercicio" onClick={() => AbrirTreino(treinos.id_treino, treinos.data_inicio, treinos.data_fim)}>
                                <p>Ver Treino</p>
                            </button>
                    </div>
                })}
            </div>

        </div>
    </div>
}

export default HomeAcamedia;
