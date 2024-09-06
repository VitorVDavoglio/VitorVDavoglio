import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";

function Home(){

    return <>

        <Navbar /> 

        <div className="container">
            <br/>
            <h3>Linguagens que utilizo</h3>
            
            <div>
                <Link to="/projetos"> Entrar página Projetos</Link>
            </div>
        </div>
    </>

}

export default Home;