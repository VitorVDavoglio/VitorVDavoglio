import "./modal_confirmacao.css";
import Modal from 'react-modal/lib/components/Modal.js';
import { Link } from "react-router-dom";


function ModalConfirmacao(props){

    const handleSimClick = () => {
        props.onConfirm(true);
    };

    const handleNaoClick = () => {
        props.onConfirm(false);
    };

    return <Modal
        isOpen = {props.isOpen}
        onRequestClose={props.onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-confirmacao"
        appElement={document.getElementById('root')}
    >
        <div className="">

            <div className="div-titulo-modal-confirmacao">
                <h4 style={{color: "black"}}>Deseja criar um novo {props.titulo}?</h4>
            </div>

            <div className="div-titulo-modal-confirmacao-botao">
                <button type="button" class="btn btn-success" onClick={handleSimClick}>
                    <p>Sim</p>
                </button>

                <button type="button" class="btn btn-danger" onClick={handleNaoClick}>
                    <p>Não</p>
                </button>
            </div>
        </div>

    </Modal>
}

export default ModalConfirmacao;