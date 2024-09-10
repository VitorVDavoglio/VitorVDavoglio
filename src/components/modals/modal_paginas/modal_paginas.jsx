import "./modal_paginas.css";
import Modal from 'react-modal/lib/components/Modal.js';
import { Link } from "react-router-dom";

import imagem from "../../../constants/images.js";

function ModalPaginas(props){


    return <Modal
        isOpen = {props.isOpen}
        onRequestClose={props.onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-paginas"
    >

        <div>
            <div className="div-modal-paginas-close">
                <button type="button" onClick={props.onRequestClose} className="modal-paginas-close">
                    <img src={imagem.closeIcon} alt="fechar" className="tamanho-barra-modal-paginas"/>
                </button>
            </div>

            <div className="div-links-tamanho">
                <Link to="/maestro" className="link">
                    <p>Maestro</p>
                </Link>
            </div>

            <div className="div-links-tamanho">
                <Link to="/home/academia" className="link">
                    <p>Academia</p>
                </Link>
            </div>

        </div>
    
    </Modal>
}

export default ModalPaginas;