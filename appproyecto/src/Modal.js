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

    render() {
        let urlVideo = this.props.datos.video;
        let titulo = this.props.datos.titulo;
        let desc = this.props.datos.descripcion;

        return (
            <div id="ventanaModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{titulo}</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <video src={urlVideo} autoPlay loop muted width="100%">
                            </video>
                            <p>{desc}</p>
                            <form className="container-fluid">
                                <div className="row">
                                    <select className="form-select col-4">
                                        <option selected>Selecciona rutina</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <input type="number" className="form-control col-4" placeholder="Numero de rondas"></input>
                                    <input type="number" className="form-control col-4" placeholder="Tiempo por ronda"></input>
                                    <input type="number" className="form-control col-4" placeholder="Numero de repeticiones"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary">Añadir a rutina</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}