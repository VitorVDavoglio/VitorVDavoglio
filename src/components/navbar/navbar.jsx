import "./navbar.css";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

import ModalPaginas from "../modals/modal_paginas/modal_paginas.jsx";

function Navbar(props){

  const navigate = useNavigate();

  const [isModalPaginasOpen, setIsModalPaginasOpen] = useState(false);

  function openModalPaginas(event){
    setIsModalPaginasOpen(true);
  }
  
  function closeModalPaginas(){
    setIsModalPaginasOpen(false);
  }

  return <>

    <ModalPaginas 
        isOpen={isModalPaginasOpen}
        onRequestClose={closeModalPaginas}
    />
    
    <nav class="navbar navbar-expand-md navbar-light container" aria-label="Fourth navbar example">
      <div class="container-fluid div-navbar-completa">
        {
          props.Interno ? <>
            <button class="navbar-toggler" type="button" onClick={openModalPaginas}>
              <span class="navbar-toggler-icon"></span>
            </button>
          </> : <>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </>
        }

        <div class="collapse navbar-collapse" id="navbarsExample04">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item li-nomedev">
              <p class="nav-link active" style={{paddingRight: "0px", fontSize: FONT_SIZE.lg, color: COLORS.orange_dev}}>DEV</p>
              <p class="nav-link active" style={{paddingLeft: "0px", paddingRight: "80px", fontSize: FONT_SIZE.lg, color: COLORS.black}}>DAVOGLIO</p>
            </li>
            {
              props.Interno ? <>
                <li class="nav-item">
                  <Link class="nav-link active" to="/maestro">Maestro</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to="/home/academia">Academia</Link>
                </li>
              </> : <>  

                <li class="nav-item">
                  <Link class="nav-link active" to="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to="/projetos">Projetos</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Sobre mim</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Serviços online</Link>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false" href="">Mais opções</a>

                  <ul class="dropdown-menu" aria-labelledby="dropdown04">
                    <li><Link class="dropdown-item">Action</Link></li>
                    <li><Link class="dropdown-item">Another action</Link></li>
                    <li><Link class="dropdown-item">Something else here</Link></li>
                  </ul>
                </li>
              </>
            }
          </ul>
          <form class="li-nomedev">
            {
              props.Interno ? <>
                <button class="btn btn-outline-success" type="submit" onClick={() => {navigate('/')}}>Sair</button>
              </> : <>
                <button class="btn btn-outline-success" type="submit" onClick={() => {navigate('/login')}}>Login</button>
              </>
            }
          </form>
        </div>

        <div className="div-devdavoglio-mobile">
          <p class="nav-link active" style={{paddingRight: "0px", fontSize: FONT_SIZE.lg, color: COLORS.orange_dev}}>DEV</p>
          <p class="nav-link active" style={{paddingLeft: "0px", fontSize: FONT_SIZE.lg, color: COLORS.black}}>DAVOGLIO</p>
        </div>

        <div className="div-devdavoglio-mobile">
          {
            props.Interno ? <>
              <button class="btn btn-outline-danger" type="submit" onClick={() => {navigate('/')}}>Sair</button>
            </> : <>
              <button class="btn btn-outline-success" type="submit" onClick={() => {navigate('/login')}}>Entrar</button>
            </>
          }
        </div>
      </div>
    </nav>
  </>
}

export default Navbar;