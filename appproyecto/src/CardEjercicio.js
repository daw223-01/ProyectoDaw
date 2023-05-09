import { element } from "prop-types";
import React from "react";
import './CardEjercicio.css';
import Modal from "./Modal";

/**RUTAS PARA USARSE EN LOS DIFERENTES ENTORNOS**/

//RUTA DE PRODUCCION
//let rutaProd = "http://now-exercise.ddns.net/api";

//RUTA DE DESARROLLO
let rutaDes = "http://localhost/api";

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
            <div className="ejercicio" data-bs-toggle="modal" data-bs-target="#ventanaModal" onClick={this.añadirDatos.bind(this)}>
                <img src={this.props.src} alt="No img"></img>
                <h3>{this.props.titulo}</h3>
                <p>{this.props.desc}</p>
            </div>
        )
    }
}