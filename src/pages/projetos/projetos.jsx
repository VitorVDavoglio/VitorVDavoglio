import "./projetos.css";
import { Link } from "react-router-dom";

function Projetos(){

    return <>
        <div className="container-fluid">
            <h1>
                Projetos
            </h1>

            <div>
                <Link to="/"> Entrar página Projetos</Link>
            </div>


        </div>

    </>
}

export default Projetos;