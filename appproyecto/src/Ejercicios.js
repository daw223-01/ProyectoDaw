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
        console.log(this.state.ej[3])
        //COMO EL RESULTADO ES UN OBJETO CON OBJETOS, SE DEBE ITERAR DE ESTA FORMA
        let lista = Object.keys(this.state.ej).map((element, i) => (
            
            <Ejercicio src={this.state.ej[element].img} titulo={this.state.ej[element].nombre} desc={this.state.ej[element].descripcion}></Ejercicio>
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
    constructor(props){
        super(props);
    }
    render() {
        
        return (
            <div className="ejercicio">
                <img src={this.props.src} alt="No img"></img>
                <h3>{this.props.titulo}</h3>
                <p>{this.props.desc}</p>
            </div>
        )
    }
}