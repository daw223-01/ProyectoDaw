import { element } from "prop-types";
import React from "react";
import './CardEjercicio.css';

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let ruta = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let ruta = "http://localhost/api";

export default class CardEjercicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosEj: ""
        }
    }

    //AÑADIR DATOS PARA MANDARLOS DE VUELTA
    añadirDatos() {
        let datos = {
            titulo: this.props.titulo,
            video: this.props.video,
            descripcion: this.props.desc,
            display: true
        }

        this.props.datosEj(datos);
    }

    render() {

        return (
            <div className="ejercicio card m-3 col-xxl-2 col-lg-3 col-md-5 col-sm-12" data-bs-toggle="modal" data-bs-target="#ventanaModal" onClick={this.añadirDatos.bind(this)}>
                <img src={this.props.src} alt="No img" className="card-img-top"></img>
                <div className="card-body">
                    <h4 className="card-title">{this.props.titulo}</h4>
                    <p className="card-text">{this.props.desc}</p>
                </div>
            </div>
        )
    }
}