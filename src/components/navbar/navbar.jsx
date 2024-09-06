import { Link, useNavigate} from "react-router-dom";
import "./navbar.css";

function Navbar(){

  const navigate = useNavigate();

  function EntrarLogin(){
    navigate('/login')
  }
  return <nav class="navbar navbar-expand-md navbar-light container" aria-label="Fourth navbar example">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item teste">
            <p class="nav-link active" style={{paddingRight: "0px", fontSize: "1.4rem", color: "#ff7f00"}}>DEV</p>
            <p class="nav-link active" style={{paddingLeft: "0px", paddingRight: "100px", fontSize: "1.4rem", color: "#000000"}}>DAVOGLIO</p>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" to="/projetos">Projetos</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link " to="">Sobre mim</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link " to="">Serviços online</Link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false" href="">Mais opções</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown04">
              <li><Link class="dropdown-item">Action</Link></li>
              <li><Link class="dropdown-item">Another action</Link></li>
              <li><Link class="dropdown-item">Something else here</Link></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit" onClick={EntrarLogin}>Login</button>
        </form>
      </div>
    </div>
  </nav>
}

export default Navbar;