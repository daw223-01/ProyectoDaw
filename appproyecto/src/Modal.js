import { element } from "prop-types";
import React from "react";
import './Modal.css';


export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: false
        }
    }

    closeModal(element) {
        //AL HACER CLICK EN LA X, SE CIERRA LA VENTANA MODAL
        element.preventDefault();

        let modal = document.querySelector("#modal");
        modal.style.display = "none";

        let video = modal.querySelector(".containerModal .modalContent video");
        video.src = "";
        console.log(video.src);
    }

    componentDidUpdate() {
        if (this.props.datos.display == true) {

            let modal = document.querySelector("#modal");
            modal.style.display = "flex";

        }
    }

    render() {
        let urlVideo = this.props.datos.video;
        let titulo = this.props.datos.titulo;
        let desc = this.props.datos.descripcion;

        return (
            <div id="modal">
                <div className="containerModal">
                    <span onClick={this.closeModal.bind(this)}>x</span>
                    <div className="modalContent">

                        <video autoPlay loop muted>
                            <source src={urlVideo} type="video/mp4"></source>
                        </video>

                        <h3>{titulo}</h3>
                        <p>{desc}</p>

                        <form>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}