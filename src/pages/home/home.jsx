import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";

function Home(){

    return <>

        <Navbar /> 

        <div className="container-fluid">
            <h1>Página Home</h1>
            
            <div>
                <Link to="/projetos"> Entrar página Projetos</Link>
            </div>
        </div>
    </>

}

export default Home;