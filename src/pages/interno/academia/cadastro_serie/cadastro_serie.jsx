import "./cadastro_serie.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiTeste from "../../../../services/apiTeste.js";
import apiWeb from "../../../../services/apiWeb.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";

function CadastroSerie(props){
    document.body.style.backgroundColor= '#0E1419';
    document.body.style.color= '#F2F4F7';

    const navigate = useNavigate();
    const location = useLocation();
    const [keyExercicio, setKeyExercicio] = useState("");
    const [nomeExercicio, setNomeExercicio] = useState("");
    const [dataTreino, setDataTreino] = useState("");
    const [acaoPagina, setAcaoPagina] = useState("");
    const [statusExercicio, setStatusExercicio] = useState("");

    const [numSeries, setNumSeries] = useState();
    const [numRepeticoes, setNumRepeticoes] = useState();
    const [numCarga, setNumCarga] = useState();

    const [tempo, setTempo] = useState(0);
    const [tempoMin, setTempoMin] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [series, setSeries] = useState([]);
    const [avisoSeries, setAvisoSeries] = useState("");


    useEffect(() => {
        if(location.state){
            setKeyExercicio(location.state.key_exercicio);
            setDataTreino(location.state.data);
            setNomeExercicio(location.state.nome);
            setAcaoPagina(location.state.acao);
            setStatusExercicio(location.state.status);
        }
        PuxarSerie();
    }, []);

    async function PuxarSerie() {
        await apiTeste.get(`/acad/series?key_exercicio=${location.state.key_exercicio}`)
        .then(resp => {
            console.log(resp.data)
            if(resp.data.length){
                setSeries(resp.data);
            }else{
                setAcaoPagina('adicionarSerie')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        let intervalId;
    
        if (isRunning) {
            intervalId = setInterval(() => {
                setTempo(tempo => {
                    if (tempo === 59) {
                        setTempoMin(tempoMin => [parseInt(tempoMin) + 1]);
                    return 0;
                } else {
                  return parseInt(tempo) + 1;
                }
              });
            }, 1000);
          } else {
          clearInterval(intervalId);
        }
    
        return () => clearInterval(intervalId);
    }, [isRunning]);
    
    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleZerarButton = () => {
        setTempo(0);
        setTempoMin(0);
    };

    function VerificarDados(){
        if(numSeries && numRepeticoes && numCarga){
            GravarDados();
        }else{
            alert("Há dados faltando");
        }
    }

    async function GravarDados(){

        let min = tempoMin;
        let seg = tempo;

        let descanso = tempoMin + ':' + tempo;
        
        await apiTeste.get(`/acad/serie/criar?key_exercicio=${keyExercicio}&num_series=${numSeries}&repeticoes=${numRepeticoes}&carga=${numCarga}&descanso=${descanso}`)
        .then(resp => {
            console.log(resp);
            if(resp.request.status === 200){
                alert('Dado inserido com sucesso');
                setNumSeries();
                setNumCarga();
                setNumRepeticoes();
                setTempo(0);
                setTempoMin(0);
                setAcaoPagina('');
                PuxarSerie();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    async function FinalizarSerie() {
        let status = 'F';
        await apiTeste.get(`/acad/serie/finalizar?status_exercicio=${status}&id_exercicio=${keyExercicio}`)
        .then(resp => {
            console.log(resp);
            if(resp.request.status === 200){
                alert('Série finalizada com sucesso');
                setStatusExercicio('F');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    return <>

        <Navbar Interno />

        <div className="container">

            <h2>Treino de ...Seg...</h2>
        
            <p>Data Treino: {dataTreino}</p>
            <h4>{nomeExercicio}</h4>

            <p>Status Exercício: {statusExercicio}</p>

            <div className="">
                {
                    series.map(dado => {
                        return <>
                            <div className="div-cadastro-series-feitas">
                                <p><strong>Séries:</strong> {dado.num_series}</p>
                                <p><strong>Carga:</strong> {dado.carga}Kg</p>
                                <p><strong>Repetições:</strong> {dado.repeticoes}</p>
                                <p><strong>descanso:</strong> {dado.descanso}</p>
                            </div>
                        </>
                    })
                }
            </div>

            {
                statusExercicio === 'F' ? <>
                
                </> : <>
                    <button className="" onClick={() => setAcaoPagina('adicionarSerie')}>
                        <p>Adicionar Série</p>
                    </button>
                </>
            }


            {
                acaoPagina === 'adicionarSerie' ? <> 
                
                    <div>    
                        <p>Quantidade de séries feitas</p>
                        
                        <div className="">
                            <input
                                type="Number"
                                value={numSeries}
                                onChange={(event) => {
                                    setNumSeries(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                    
                    <div>    
                        <p>Quantidade de carga</p>
                        <div className="">
                            <input
                                type="Number"
                                value={numCarga}
                                onChange={(event) => {
                                    setNumCarga(event.target.value);
                                }}
                            />
                            KG
                        </div>
                    </div>

                    <div>    
                        <p>Quantidade de repetições feitas</p>
                        <div className="">
                            <input
                                type="Number"
                                value={numRepeticoes}
                                onChange={(event) => {
                                    setNumRepeticoes(event.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <p>Tempo: {tempoMin}min {tempo}s</p>
                        <button onClick={handleStartPause}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
                        <button onClick={handleZerarButton}>Zerar</button>
                    </div>

                    <button className="" onClick={VerificarDados}>
                        <p>Salvar Série</p>
                    </button>
                </> : <> 
                
                </>
            }

            {
                statusExercicio === 'F' ? <>
                
                </> : <>
                    <button className="" onClick={FinalizarSerie}>
                        <p>Finalizar Série</p>
                    </button>
                </>
            }
            
        </div>
            
    </>
}

export default CadastroSerie;