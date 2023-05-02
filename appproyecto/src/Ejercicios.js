import { element } from "prop-types";
import React from "react";
import './Ejercicios.css';

export default class Ejercicios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ej: ""
        }
    }

    //FUNCION PARA OBTENER EL LISTADO DE EJERCICIOS
    async renderEjercicios() {
        let listado = [];
        let consulta = await getEjercicios();
        //SE EMPIEZA POR EL 1 PARA EVITAR COGER LA CABECERA
        for (let i = 1; i < consulta.length; i++) {
            let datos = consulta[i];

            let datosEjercicio = {
                nombre: datos.nombre,
                grupoMuscular: datos.grupoMuscular,
                descripcion: datos.descripcion,
                video: datos.urlVideo,
                img: datos.urlImg
            }

            listado.push(datosEjercicio);
        }

        this.setState({
            ej: listado
        }, () => { });

    }

    componentDidMount() {
        //EJECUTAR LA FUNCION AL RENDERIZAR EL COMPONENTE
        this.renderEjercicios();
    }

    render() {

        let lista = Object.keys(this.state.ej).map((element, i) => (
            
            <div key={i} className="datosEjercicio">
                <img src={this.state.ej[element].img}></img>
                <h2>{this.state.ej[element].nombre}</h2>
            </div>
        ));

        return (
            <div id="containerEjercicios">
                {lista}
            </div>
        )
    }
}


/*******FUNCIONES Y COMPONENTES EXTRA**********/
async function getEjercicios() {
    let options = {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }
    let consulta = await fetch("http://localhost/api/ejercicios", options);

    if (consulta.ok) {
        return consulta.json();
    }
}

class Ejercicio extends React.Component {
    render() {
        return (
            <div id="ejercicio">

            </div>
        )
    }
}