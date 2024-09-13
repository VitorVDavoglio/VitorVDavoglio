import "./cadastro_exerc.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiTeste from "../../../../services/apiTeste.js";
import apiWeb from "../../../../services/apiWeb.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";

function CadastroExerc(props){
    document.body.style.backgroundColor= '#0E1419';
    document.body.style.color= '#F2F4F7';

    const navigate = useNavigate();
    const location = useLocation();
    const [keyTreino, setKeyTreino] = useState("");
    const [dataInicioTreino, setDataInicioTreino] = useState("");
    const [dataFimTreino, setDataFimTreino] = useState("");
    const [acaoPagina, setAcaoPagina] = useState("");
    const [grupoMuscular, setGrupoMuscular] = useState([]);
    const [idGrupoMuscularEscolhido, setIdGrupoMuscularEscolhido] = useState("");
    const [grupoExercicio, setGrupoExercicio] = useState([]);
    const [idGrupoExercicioEscolhido, setIdGrupoExercicioEscolhido] = useState("");
    const [mensagemServidor, setMensagemServidor] = useState("");
    const [exerciciosFeitos, setExerciciosFeitos] = useState([]);

    useEffect(() => {
        setAcaoPagina('');
        if(location.state){
            setKeyTreino(location.state.key_treino);
            setDataInicioTreino(location.state.data_inicio);
            setDataFimTreino(location.state.data_fim);
        }
        BuscarExercicios();
    }, []);

    async function BuscarExercicios() {
        await apiTeste.get(`/acad/exercicios?key_treino=${location.state.key_treino}`)
        .then(resp => {
            console.log(resp.data)
            setExerciciosFeitos(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    async function BuscarGruposMusculares() {
        await apiTeste.get(`/acad/grupoMuscular`)
        .then(resp => {
            setGrupoMuscular(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function GrupoMuscularSelecionado(evento){
        setIdGrupoMuscularEscolhido(evento.target.value);
    }

    useEffect(() => {
        BuscarGruposExercicio();
    }, [idGrupoMuscularEscolhido]);

    async function BuscarGruposExercicio(){
        await apiTeste.get(`/acad/grupoExercicio?key_grupo_muscular=${idGrupoMuscularEscolhido}`)
        .then(resp => {
            setGrupoExercicio(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function GrupoExercicioSelecionado(evento){
        setIdGrupoExercicioEscolhido(evento.target.value);
    }

    async function SalvarExercicio(){
        await apiTeste.get(`/acad/exercicio/criar?key_grupo_exercicio=${idGrupoExercicioEscolhido}&key_treino=${keyTreino}`)
        .then(resp => {
            console.log(resp);
            if(resp.request.status === 200){
                setMensagemServidor('Exercício criado com sucesso');
                BuscarExercicios();
                // navigate("/academia/cadastro/exercicio", {state:{key_treino: keyTreino}})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    function CadastrarSerie(key, nome, status){
        navigate("/academia/cadastro/serie", {state:{acao: '',key_exercicio: key, data: dataInicioTreino, nome: nome, status: status}});
    }

    async function FinalizarTreino() {
        let now = new Date()

       let dataSeparda = now.getDate();
       let mesSeparda = now.getMonth() + 1;
       mesSeparda = mesSeparda < 10 ? "0" + mesSeparda : mesSeparda;
       let anoSeparda = now.getFullYear();
       let horaSeparda = now.getHours();
       let minSeparda = now.getMinutes();
       let segSeparda = now.getSeconds();
      
       let dataCompleta = (anoSeparda + "-" + mesSeparda  + "-" + dataSeparda + " " + horaSeparda + ":" + minSeparda + ":" + segSeparda)
        await apiTeste.get(`acad/treino/finalizar?data_fim=${dataCompleta}&id_treino=${keyTreino}`)
        .then(resp => {
            console.log(resp);
            if(resp.request.status === 200){
                alert('Treino finalizado com sucesso');
            }
        })
        .catch(err => {
            console.log(err);
            if(err.response.status === 400){
                alert(err.response.data);
            }
        })
    }

    return <>

        <Navbar Interno />

        <div className="container">

            <h2>Treino de ...Seg...</h2>

            <p>Início = {dataInicioTreino}</p>
            
            <div className="div-cadastro-exercico-status-fim-treino">
                <p> Treino</p>
                    
                    {   dataFimTreino ? <>
                            Finalizado em {dataFimTreino}
                        </> : <>
                            <p> em aberto</p> 
                        </>
                    
                    }
                
            </div>

            <div className="">
                <h4>Exercícios Feitos</h4>
                
                {
                    exerciciosFeitos.map(exerc => {
                        return <div className="div-cadastro-exerc-feitos">
                            <p><strong>{exerc.nome_muscular}</strong></p>
                            <div className="div-cadastro-exerc-feitos-series">
                                <h4>{exerc.nome_exercicio}</h4>
                                <button className="" onClick={() => CadastrarSerie(exerc.id_exercicio, exerc.nome_exercicio, exerc.status_exercicio)}>
                                    <p>1x 15kg 15x</p>
                                </button>
                                <p className="p-div-cadastro-exerc-feitos-series">
                                    {
                                        exerc.status_exercicio === 'F' ? <>
                                            Exercício Finalizado
                                        </> : <>
                                            Exercício Aberto
                                        </>
                                    }
                                </p>
                            </div>
                        </div>
                    })
                }
                
            </div>
            
            {
                dataFimTreino ? <>
                
                </> : <>
                    <button className="button-cadastro-adicionar-exerc" onClick={() => {setAcaoPagina('adicionarExerc'); BuscarGruposMusculares();}}>
                        <p>Adicionar Exercício</p>
                    </button>
                </>
            }

            {
                acaoPagina === 'adicionarExerc' ? <>
                
                    <div className="">
                        <h4>Selecione o grupo muscular desejado:</h4>
                        <select class="form-select" aria-label="Default select example" onChange={GrupoMuscularSelecionado}>
                            <option selected>...</option>
                            {
                                grupoMuscular.map(grupo => {
                                    return <option value={grupo.id_grupo_muscular}>{grupo.nome}</option>
                                    
                                })
                            }
                        </select>
                    </div>

                    <div className="">
                        <h4>Selecione o exercicio desejado:</h4>
                        <select class="form-select" aria-label="Default select example" onChange={GrupoExercicioSelecionado}>
                            <option selected>...</option>
                            {
                                grupoExercicio.map(grupo => {
                                    return <option value={grupo.id_grupo_exercicio}>{grupo.nome}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="">
                        <button className="quadrado-iniciar-exercicio" onClick={SalvarExercicio}>
                            <p>Iniciar exercício</p>
                        </button>
                        <p>{mensagemServidor}</p>
                    </div>
                </> : <>
                
                </>
            }

            {
                dataFimTreino ? <>
                
                </> : <>
                <div className="button-cadastro-adicionar-exerc">
                    <button className="" onClick={FinalizarTreino}>
                        <p>Finalizar Treino</p>
                    </button>
                </div>
                </>
            }
            

        </div>
    </>
}

export default CadastroExerc;