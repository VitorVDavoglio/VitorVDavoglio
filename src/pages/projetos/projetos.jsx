import "./projetos.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/navbar.jsx";

function Projetos(){
    document.body.style= 'background-color: #00000';


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