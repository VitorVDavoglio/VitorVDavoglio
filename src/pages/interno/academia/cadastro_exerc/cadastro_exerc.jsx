import "./cadastro_exerc.css";
import Navbar from "../../../../components/navbar/navbar.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import apiTeste from "../../../../services/apiTeste.js";
import apiWeb from "../../../../services/apiWeb.js";
import { CONSTANTES_SERVER } from "../../../../style/const.js";

function CadastroExerc(props){

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
        if(location.state){
            setKeyTreino(location.state.key_treino);
            setDataInicioTreino(location.state.data_inicio);
            setDataFimTreino(location.state.data_fim);
            setAcaoPagina(location.state.acao);
        }
        BuscarGruposMusculares();
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
                navigate("/academia/cadastro/exercicio", {state:{key_treino: keyTreino}})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    function CadastrarSerie(key, nome){
        navigate("/academia/cadastro/serie", {state:{acao: '',key_exercicio: key, data: dataInicioTreino, nome: nome}});
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

            <h2>Página Cadastro Exercício</h2>

            <p>data_treino = {dataInicioTreino}</p>

            <p>data_fim_treino = {dataFimTreino}</p>

            <div className="">
                <h4>Exercícios Feitos</h4>
                
                {
                    exerciciosFeitos.map(exerc => {
                        return <>
                            <p><strong>{exerc.nome_muscular}</strong></p>
                            <button className="" onClick={() => CadastrarSerie(exerc.id_exercicio, exerc.nome_exercicio)}>
                                <p>{exerc.nome_exercicio}</p>
                            </button>
                        </>
                    })
                }
                
            </div>
            
            {
                dataFimTreino ? <>
                
                </> : <>
                    <button className="button-cadastro-adicionar-exerc" onClick={() => {setAcaoPagina('adicionarExerc')}}>
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
                        <p>{idGrupoMuscularEscolhido}</p>
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
                        <p>{idGrupoExercicioEscolhido}</p>
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