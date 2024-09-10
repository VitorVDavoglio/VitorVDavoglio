import "./projetos.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/navbar.jsx";

function Projetos(){

    return <>

        <Navbar />

        <div className="container">
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