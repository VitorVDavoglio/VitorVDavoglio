import "./login.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import apiWeb from "../../services/apiWeb.js";

function Login(){

    const navigate = useNavigate();
    const username = '';
    const password = '';
    const credentials = btoa(`${username}:${password}`);

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [resultado, setResultado] =useState([]);

    function SalvarNome(e){
        setNome(e.target.value);
    }

    function SalvarSenha(e){
        setSenha(e.target.value);
    }

    function VerificarDados(e){
        e.preventDefault();
        if(nome && senha){
            PegarLogin();
        }else{
            alert("Falta preencher dados");
        }
    }

    async function PegarLogin() {
        await apiWeb.get(`login/entrar?nome=${nome}&senha=${senha}`,{
            headers: {
                'Authorization' : `Basic ${credentials}`,
            }
        })
        .then(response => {
            console.log(response.data);
            setResultado(response.data);
            // if(response.data){
            //     navigate('/projetos')
            // }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return <>

        <Navbar />

        <div className="container">
            <h1>
                Login
            </h1>

            <div className="container">
                <form onSubmit={VerificarDados}>
                    <div class="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={SalvarNome} value={nome}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input type="text" className="form-control" onChange={SalvarSenha} value={senha}/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div>
                <p>{resultado.id}</p>
                <p>{resultado.nome}</p>
                <p>{resultado.permissao}</p>
            </div>


        </div>

    </>
}

export default Login;