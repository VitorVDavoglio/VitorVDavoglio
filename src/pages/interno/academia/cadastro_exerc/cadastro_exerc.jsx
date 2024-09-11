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
    const [dataTreino, setDataTreino] = useState("");
    const [grupoMuscular, setGrupoMuscular] = useState([]);
    const [idGrupoMuscularEscolhido, setIdGrupoMuscularEscolhido] = useState("");
    const [grupoExercicio, setGrupoExercicio] = useState([]);
    const [idGrupoExercicioEscolhido, setIdGrupoExercicioEscolhido] = useState("");

    useEffect(() => {
        if(location.state){
            setKeyTreino(location.state.key_treino);
            setDataTreino(location.state.data);
        }
        BuscarGruposMusculares();
    }, []);

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
            console.log(resp);
            setGrupoExercicio(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function GrupoExercicioSelecionado(evento){
        setIdGrupoExercicioEscolhido(evento.target.value);
    }



    return <>

        <Navbar Interno />

        <div className="container">

            <h2>Página Cadastro Exercício</h2>

            <p>data_treino = {dataTreino}</p>

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
                <button className="quadrado-iniciar-exercicio">
                    <p>Iniciar exercício</p>
                </button>
            </div>
        </div>
    </>
}

export default CadastroExerc;